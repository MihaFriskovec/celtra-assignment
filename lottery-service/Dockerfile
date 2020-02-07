FROM node:12.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production

COPY . .

CMD ["node", "src/app.js"]