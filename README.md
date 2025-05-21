# ЭкоЭнергия — pet-проект

Веб-приложение для консультаций по возобновляемой энергетике, демонстрирующее современные подходы к фронтенду и бэкенду.

## Что умеет проект

- **AI-чат с GigaChat** — виртуальный помощник отвечает на вопросы о продуктах и технологиях компании (интеграция с GigaChat API, строгие правила тематики, лимит сообщений на пользователя).
- **Форма обратной связи** — сообщения с сайта отправляются на email владельца через SMTP (Яндекс.Почта).
- **Новости и разделы о продуктах** — пока хардкод.
- **Сохранение истории чата** — история сообщений хранится в localStorage пользователя.
- **Ограничение по количеству сообщений** — лимит на обращения к AI для каждого IP и браузера (кроме владельца).
- **Адаптивный дизайн** — современный UI на React, TailwindCSS, shadcn/ui.
- **Деплой через Docker и Render.com** — фронт и бэк собираются в один контейнер, легко разворачиваются на любой платформе.

## Технологии

- React 18 + Vite + TypeScript
- TailwindCSS + shadcn/ui
- Express.js (Node.js)
- GigaChat API
- Nodemailer (SMTP)
- Docker (multi-stage build)

## Быстрый старт (локально)

1. Клонируйте репозиторий и установите зависимости:
   ```bash
   npm install
   ```
2. Создайте файл `.env` в корне и укажите переменные (пример ниже).
3. Запустите проект:
   ```bash
   npm run dev
   ```
   Фронт: http://localhost:8081/
   Бэк: http://localhost:3000

## Переменные окружения (пример .env)

```
GIGA_CHAT_ACCESS_KEY=...
ADMIN_IP=...
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your_email@yandex.ru
SMTP_PASS=your_app_password
VITE_API_URL=
```

## Сборка и деплой через Docker

1. Соберите образ:
   ```bash
   docker buildx build --platform linux/amd64 -t yourdockerhub/sun-wind-contact:latest .
   ```
2. Запушьте в Docker Hub:
   ```bash
   docker push yourdockerhub/sun-wind-contact:latest
   ```
3. Разверните на Render.com или другом сервисе, указав переменные окружения через интерфейс платформы.

## Автор

Мария Зайцева  
[Telegram](https://t.me/mazay_tseva) | [LinkedIn](https://www.linkedin.com/in/mazaytsevs/)
