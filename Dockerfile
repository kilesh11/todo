
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY /client/package.json /client/yarn.lock ./

RUN yarn install

COPY client/. .

RUN yarn build

#=============================================================

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY /server/package.json /server/yarn.lock ./

RUN yarn install

COPY server/. .

RUN yarn build

COPY --from=0 /usr/src/app/build /usr/src/app/dist/build

EXPOSE 80

CMD ["yarn", "run", "prod" ]



