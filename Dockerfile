FROM node:18-alpine as build
ENV NODE_ENV production
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
COPY . .
RUN npm install typescript@latest -g
RUN yarn install
RUN yarn run build

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
