# Use an official Node.js LTS (Long Term Support) version as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production=true

# Build the application
FROM base AS builder

# Set the working directory
WORKDIR /app

# Copy the source code
COPY . .

# Build the Next.js application
RUN yarn build

# Final production image
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only necessary files from previous stages
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=base /app/node_modules ./node_modules

# Expose the port Next.js is running on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
