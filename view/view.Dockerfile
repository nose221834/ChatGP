FROM node:20.11.1

WORKDIR /view
COPY ./ /view

RUN yarn set version stable
RUN yarn install

