FROM node:15-alpine3.13 as build

WORKDIR /app

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY index.js index.js
COPY package.json package.json

RUN npm install --only=production | npm i mysql

FROM build
EXPOSE 3000
COPY --from=build /app /
CMD npm run start