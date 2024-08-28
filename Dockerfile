# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 to serve the application
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]