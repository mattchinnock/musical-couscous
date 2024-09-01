# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files, but not node_modules
COPY . .

# Rebuild node_modules (clean and reinstall)
RUN npm rebuild sqlite3

# Expose the port the app runs on
EXPOSE 3087

# Start the application
CMD ["node", "index.js"]
