FROM node:18-alpine

WORKDIR /var/www/nuxt

RUN apk update && \
    apk add git curl && \
    yarn global add create-nuxt-app