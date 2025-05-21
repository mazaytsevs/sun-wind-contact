# Этап сборки фронта
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY ./src ./src
COPY ./public ./public
COPY index.html ./
RUN npm install
RUN npm run build

# Production-этап
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY server ./server
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "server/index.js"]