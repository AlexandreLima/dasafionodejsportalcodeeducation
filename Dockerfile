FROM node:15-alpine3.13 as build

WORKDIR /app

COPY index.js index.js
COPY package.json package.json

RUN npm install --only=production | npm i mysql

FROM build
EXPOSE 3000
COPY --from=build /app /
CMD npm run start