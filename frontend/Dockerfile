FROM node:14-alpine as base

WORKDIR /src
COPY package*.json ./

FROM base as dev
ENV NODE_ENV=development
RUN npm install && npm install -g @vue/cli
COPY . .
CMD ["npm", "run", "serve"]
