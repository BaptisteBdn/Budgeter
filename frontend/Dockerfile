FROM node:14-alpine as base

WORKDIR /src
COPY package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "run", "serve"]
