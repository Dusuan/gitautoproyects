FROM node:16-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
libnss3 \
libatk-bridge2.0-0 \
libx11-xcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxi6 \
libxtst6 \
libglib2.0-0 \
libgbm1 \
libpango-1.0-0 \
libxrandr2 \
libcups2 \
libatk1.0-0 \
libpangocairo-1.0-0 \
libgtk-3-0 \
libdrm2

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]






