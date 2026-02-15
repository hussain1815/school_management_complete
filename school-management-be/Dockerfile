FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma
RUN npm prune --omit=dev

EXPOSE 3000

CMD ["node", "src/server.js"]
