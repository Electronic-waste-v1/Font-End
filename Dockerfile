FROM node:18.18-alpine3.18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18.18-alpine3.18 
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]
