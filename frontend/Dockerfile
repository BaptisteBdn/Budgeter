FROM node:14-alpine as build

WORKDIR /src
ENV PATH /src/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
RUN npm install -g @vue/cli
COPY . /src
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL $VUE_APP_API_URL
RUN npm run build

FROM nginx
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]