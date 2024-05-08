FROM node:20.11.1-bookworm-slim

WORKDIR /view
COPY ./ /view

RUN yarn set version stable
RUN yarn install

CMD sh -c "yarn && yarn dev"
