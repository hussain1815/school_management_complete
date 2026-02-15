FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma
RUN npm prune --omit=dev

EXPOSE 3000

CMD ["node", "src/server.js"]
