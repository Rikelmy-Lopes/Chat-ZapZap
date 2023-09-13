FROM node:lts-alpine
USER node
WORKDIR /frontend-docker
RUN chown node:node /frontend-docker
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm install
EXPOSE 3000