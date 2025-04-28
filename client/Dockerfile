# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy frontend package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build the React app
RUN npm run build

# Install lightweight HTTP server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the build
CMD ["serve", "-s", "build", "-l", "3000"]
