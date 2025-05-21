# Этап сборки фронта
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY .env* ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# Production-этап
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
COPY server ./server
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["concurrently", "vite preview --host 0.0.0.0 --port 4173", "node server/index.js"]