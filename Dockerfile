FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

RUN npx prisma generate

# RUN npx prisma migrate dev

CMD ["npm","run", "dev"]