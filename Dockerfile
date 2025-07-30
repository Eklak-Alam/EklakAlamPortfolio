# Base image for dependencies
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy rest of the project files
COPY . .

# Build Next.js app
RUN npm run build

# Use a light image to run the app
FROM node:20-alpine AS runner
WORKDIR /app

# Copy from previous stage
COPY --from=deps /app .

# Set environment variable
ENV NODE_ENV=production

# Expose the port Next.js uses
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
