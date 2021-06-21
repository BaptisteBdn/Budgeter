FROM node:14-alpine

WORKDIR /src
COPY package*.json ./
EXPOSE 8081
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
