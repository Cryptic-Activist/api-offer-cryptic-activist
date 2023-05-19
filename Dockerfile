FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

RUN npx prisma generate

CMD ["npm","run", "dev"]