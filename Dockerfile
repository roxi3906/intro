# Build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS runner

# OCI Labels for GHCR linking
LABEL org.opencontainers.image.source="https://github.com/roxi3906/intro"
LABEL org.opencontainers.image.description="Roxi Introduction Website"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

# Copy built output
COPY --from=builder /app/.output ./.output

# Expose port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the application
CMD ["bun", "run", ".output/server/index.mjs"]
