# Use a Node.js base image
FROM node:14

RUN apt-get update && apt-get install -y redis-tools

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your backend application will run
EXPOSE 5000

# Set the command to run your backend application
CMD [ "npm", "start" ]