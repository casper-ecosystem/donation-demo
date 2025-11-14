FROM node:20.12.0-alpine3.18 as builder

WORKDIR /api/builder

COPY client/package*.json ./

RUN npm config set registry https://registry.npmmirror.com
RUN npm config set update-notifier false

RUN npm install --legacy-peer-deps

COPY client/. .
COPY client/public/config.js.template ./public/config.js.template

RUN npm run build

FROM nginx:1.22.0

WORKDIR /usr/share/nginx/html

COPY --from=builder /api/builder/build ./
COPY --from=builder /api/builder/public/config.js.template ./config.js.template
COPY --from=builder /api/builder/public/favicon* ./

COPY infra/docker/client-nginx/nginx.conf /etc/nginx/nginx.conf
COPY infra/docker/client-nginx/100-build-env-specific-assets.sh /docker-entrypoint.d

EXPOSE 3000
