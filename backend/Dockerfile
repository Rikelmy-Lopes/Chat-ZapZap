FROM node:lts-alpine
WORKDIR /backend-docker
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
EXPOSE 4000