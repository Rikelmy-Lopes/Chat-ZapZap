FROM node:18-alpine

USER node

WORKDIR /home/frontend-docker

RUN chown node:node /home/frontend-docker

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000