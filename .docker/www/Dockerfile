FROM node:12.16-alpine
WORKDIR /opt/bn
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
RUN npm install -g http-server
CMD [ "http-server", "dist" ]
