FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_GOOGLE_CLIENT_ID
RUN npm run build

FROM nginx:stable-alpine
ENV API_GATEWAY_URL=http://api-gateway:8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
