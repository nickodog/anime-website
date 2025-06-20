# Build Stage
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Production Stage
FROM node:20

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]
