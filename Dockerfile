# Use an official Node runtime as a base image
FROM node:20.11.0-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the Angular app files to the working directory
COPY . .

# Build the Angular app
RUN yarn build

# Use Nginx as a lightweight base image
FROM nginx:stable

# Copy the Angular build from the builder stage to the nginx directory
COPY --from=builder /usr/src/app/dist/itlinkwave-website /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80
