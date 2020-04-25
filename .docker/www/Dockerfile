FROM node:12.16-alpine AS dev
WORKDIR /opt/bn
COPY www/package*.json ./
RUN npm install
COPY www ./

FROM dev AS build
WORKDIR /opt/bn
RUN npm run build
RUN npm prune --prod

FROM nginx:1.17-alpine
COPY .docker/www/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /opt/bn/dist ./
USER nginx
