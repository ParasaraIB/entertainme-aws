FROM node:12.0-alpine

LABEL maintainer="parasaraib"

WORKDIR /usr/local/tv

ENV DB_URL=mongodb+srv://entertainme:entertainme@cluster0.xm29x.mongodb.net/entertainme?retryWrites=true&w=majority
ENV DB_NAME=entertainme

COPY . .

RUN npm install -g nodemon

RUN apk update \
  && apk add --update python python-dev py-pip build-base \
  && apk add git zip unzip vim nano \
  && rm -rf /var/cache/apk/* \
  && npm install \ 
  && apk add --no-cache bash

ENV TZ=Asia/Makassar
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["nodemon", "app.js"]