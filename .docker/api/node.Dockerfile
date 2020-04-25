FROM node:12.16-alpine AS dev
RUN npm install -g @nestjs/cli
WORKDIR /opt/bn
COPY api/package*.json ./
RUN npm install
COPY api ./

FROM dev AS build
WORKDIR /opt/bn
RUN npm run build
RUN npm prune --prod

FROM node:12.16-alpine
WORKDIR /opt/bn
COPY --from=build /opt/bn ./
USER node
CMD [ "npm", "run", "start:prod" ]
