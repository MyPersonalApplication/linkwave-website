# Stage 1: Build Angular App
FROM node:18-alpine as build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/itlinkwave-website/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
