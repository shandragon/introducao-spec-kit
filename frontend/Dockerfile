# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY shared/ ./shared/
RUN cd shared && npm install && npm run build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
