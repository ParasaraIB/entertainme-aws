FROM node:12.0-alpine

LABEL maintainer="parasaraib"

WORKDIR /usr/local/orchestrator

ENV REDISLABS_HOST=redis-18441.c12.us-east-1-4.ec2.cloud.redislabs.com
ENV REDISLABS_PASSWORD=YVTnQuZoo30PvoEOqv5MWWoY2MmDo6OZ

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