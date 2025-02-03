FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build

# Expose the application port
EXPOSE 4000

# Command to run the SSR server
CMD ["npm", "run", "serve:ssr:CurrencyExchange"]
