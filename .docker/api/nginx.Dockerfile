FROM nginx:1.17-alpine
COPY .docker/api/nginx.conf /etc/nginx/nginx.conf
USER nginx
