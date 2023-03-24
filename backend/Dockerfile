FROM node:lts-alpine
WORKDIR /backend-docker
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 3001
EXPOSE 4000