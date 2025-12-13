# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies with clean install
RUN npm ci --only=production=false

# Copy the rest of the application files
COPY . .

# Set environment variables for build
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=4096

# Build the React application
RUN npm run build

# Serve the application using npm's serve command
RUN npm install -g serve

# Expose port 3000 or whatever port serve uses
EXPOSE 3000

# Start the React app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
