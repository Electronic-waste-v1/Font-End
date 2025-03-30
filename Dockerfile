FROM node:18.18-alpine3.18 as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false --silent

COPY . .


FROM node:18.18-alpine3.18 as production
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
