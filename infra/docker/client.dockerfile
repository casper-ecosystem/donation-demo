FROM node:20-alpine3.22 AS builder

WORKDIR /client

COPY client/package*.json ./

RUN npm config set update-notifier false && \
    npm install --legacy-peer-deps

COPY client/. .

RUN npm run build

FROM nginx:1.29-alpine3.22

WORKDIR /usr/share/nginx/html

COPY --from=builder /client/build/ ./
COPY client/public/config.js.template ./config.js.template

COPY infra/docker/client-nginx/nginx.conf /etc/nginx/nginx.conf
COPY infra/docker/client-nginx/100-build-env-specific-assets.sh /docker-entrypoint.d

EXPOSE 3000
