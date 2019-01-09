FROM node:10.15-alpine
COPY . /opt/bn
WORKDIR /opt/bn
RUN npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 8080
