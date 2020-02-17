# Build project
FROM node:10-alpine AS builder

WORKDIR /usr/src/app
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build:production
