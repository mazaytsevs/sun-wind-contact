process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import express from "express";
import cors from "cors";
import GigaChat from "gigachat";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const ADMIN_IP = process.env.ADMIN_IP;
const LIMIT = 10;
const ipCounters = {};

app.use(cors());
app.use(express.json());

// Отдача статики
app.use(express.static(path.join(__dirname, "../dist")));

const systemMessage = {
  role: "system",
  content: `Ты AI-консультант по возобновляемой энергетике. Отвечай только на вопросы, связанные с возобновляемой энергетикой, продуктами и услугами компании. На любые другие темы (например, политика, финансы, личная жизнь, медицина, программирование, развлечения, спорт, отношения, философия, религия, история, география, наука вне энергетики, бытовые советы, юмор, гадания, прогнозы, астрология, психология, искусство, музыка, кино, литература, еда, путешествия, автомобили, животные, дети, семья, образование, учеба, бизнес, инвестиции, криптовалюты, технологии вне энергетики и т.д.) — категорически не отвечай, а вежливо отказывайся и объясняй, что ты консультант только по возобновляемой энергетике и продуктам компании. Не отвечай на вопросы, связанные с насилием, угрозами, дискриминацией, нарушением законов, личными данными других людей, нецензурной лексикой и оскорблениями. Если пользователь задаёт подобные вопросы — вежливо откажись отвечать. Отвечай по делу, лаконично, но если нужно — можешь писать развёрнутые ответы.`,
};

const giga = new GigaChat({
  credentials: process.env.GIGA_CHAT_ACCESS_KEY,
});

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip
  );
}

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages (array) is required" });
    }
    const clientIp = getClientIp(req);
    if (clientIp !== ADMIN_IP) {
      ipCounters[clientIp] = (ipCounters[clientIp] || 0) + 1;
      if (ipCounters[clientIp] > LIMIT) {
        return res.json({
          response:
            "Вы достигли лимита отправления сообщений виртуальному помощнику. Для экономии токенов Маша поставила это ограничение. А если вам нравится все, что здесь сделано и вы хотите сотрудничать - пишите ей в ТГ: @mazay_tseva или в linkedin: https://www.linkedin.com/in/mazaytsevs/ ",
        });
      }
    }
    // Всегда добавляем systemMessage первым
    const fullMessages = [
      systemMessage,
      ...messages.filter((m) => m.role !== "system"),
    ];
    const response = await giga.chat({ messages: fullMessages });
    res.json({ response: response.choices[0]?.message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

app.post("/send-contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log(name, email, message);
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: `EcoEnergy Contact <${process.env.SMTP_USER}>`,
      to: "zaytseva.m.v@yandex.ru",
      subject: "Новое сообщение с сайта EcoEnergy",
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
    });
    res.json({ ok: true });
  } catch (error) {
    console.error("Mail error:", error);
    res.status(500).json({ error: "Ошибка отправки письма" });
  }
});

// SPA fallback: для всех остальных роутов отдаём index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
