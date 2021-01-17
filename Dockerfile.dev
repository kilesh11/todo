
FROM node:lts-alpine as server

WORKDIR /usr/src/app

COPY /server/package.json /server/yarn.lock ./

RUN yarn install

COPY server/. .

CMD ["yarn", "start"]

#=============================================================

FROM node:lts-alpine as client

WORKDIR /usr/src/app

COPY /client/package.json /client/yarn.lock ./

RUN yarn cache clean \
    yarn install

COPY client/. .

CMD ["yarn", "start"]

