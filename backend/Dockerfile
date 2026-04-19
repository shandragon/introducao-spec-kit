# Build stage
FROM node:20-alpine AS builder
# Add dependencies for Prisma
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY shared/ ./shared/
RUN cd shared && npm install && npm run build
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/ ./backend/
RUN cd backend && npx prisma generate
RUN cd backend && npm run build

# Production stage
FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/backend/package*.json ./backend/
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
EXPOSE 3001
CMD ["npm", "--prefix", "backend", "start"]
