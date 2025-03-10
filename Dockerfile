FROM node:18-slim

# Install dependencies and Google Chrome
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  libnss3 \
  libgbm-dev \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 4040

CMD ["node", "index.js"]
