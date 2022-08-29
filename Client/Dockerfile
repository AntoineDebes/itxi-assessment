
FROM node:current-alpine3.15

WORKDIR /app

COPY package.json .
RUN npm i
COPY . .
RUN npm run build
# COPY ./public/index.html

CMD [ "npx", "serve", "build" ]