FROM node:10-alpine

WORKDIR /
COPY backend/package*.json ./

RUN npm ci
COPY . .

CMD npm run start
