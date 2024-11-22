FROM node:18-alpine

WORKDIR /
ADD . ./src
WORKDIR ./src

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]
