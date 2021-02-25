FROM node:14-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 8081

FROM base as production
ENV NODE_ENV=production
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["npm", "run", "start:dev"]
