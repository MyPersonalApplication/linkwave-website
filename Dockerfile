FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=node /app/dist/itlinkwave-website/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
