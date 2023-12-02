FROM node:18-alpine
USER node
WORKDIR /home/backend-docker
RUN chown node:node /home/backend-docker
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm install
EXPOSE 3001
EXPOSE 4000