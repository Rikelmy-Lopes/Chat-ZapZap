FROM node:lts-alpine
WORKDIR /frontend-docker
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000