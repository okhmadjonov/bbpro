# Use node:18-alpine as the base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json file to install dependencies
COPY package.json .

# Install dependencies
RUN npm install --only=production

# Use a new stage for the builder
FROM base AS builder

# Copy the rest of the application code
COPY . .

# Run the build script (assuming it's defined in package.json scripts)
RUN npm run build

# Use node:18-alpine as the production image
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy node_modules from the base stage (already installed dependencies)
COPY --from=base /app/node_modules ./node_modules

# Expose port 3000 (assuming your application listens on this port)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
