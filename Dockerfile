# Author: Marco Vilera

# STAGE 1: Build ###
# label our stage as ‘builder’
FROM node:10-alpine as builder
COPY package.json package-lock.json ./
# Store node_modules on a different layer to prevent unnecesary npm installs
RUN npm ci && mkdir /react-app && mv ./node_modules ./react-app
WORKDIR /react-app
COPY . .
# Build the application and store artifacts in /react-app/dist
ENV NODE_PATH src
RUN npm run build

# STAGE 2: Webserver
FROM nginx:1.14.1-alpine
# Copy our nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Copy from ‘builder’ /react-app/dist folder to default nginx public folder
COPY --from=builder /react-app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
