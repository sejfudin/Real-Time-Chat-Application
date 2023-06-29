# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
