FROM node:14

RUN mkdir -p /usr/src/app/node_module

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD npm start
