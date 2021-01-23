
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY /client/package.json /client/yarn.lock ./

RUN yarn

COPY client/. .

RUN yarn build

#=============================================================

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY /server/package.json /server/yarn.lock ./

RUN yarn

COPY server/. .

RUN yarn build

#================================================================

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY /server/package.json /server/yarn.lock ./

RUN yarn --prod

COPY --from=0 /usr/src/app/build /usr/src/app/build
COPY --from=1 /usr/src/app/dist /usr/src/app/

EXPOSE 80

CMD ["yarn", "run", "prod" ]
