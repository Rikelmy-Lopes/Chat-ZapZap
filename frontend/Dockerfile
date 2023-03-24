FROM node:lts-alpine
WORKDIR /frontend-docker
COPY package*.json .
COPY . .
RUN npm install
EXPOSE 3000