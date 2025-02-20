# Use Node.js 20.18.3 as the base image
FROM node:20.18.3-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install --omit=dev

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Use Nginx to serve the React build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
