FROM node:18-alpine

RUN apk add g++ make python3

WORKDIR /app

ADD package.json package-lock.json tsconfig.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

CMD [ "npm", "start" ]
