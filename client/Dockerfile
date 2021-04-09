FROM node:10

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=0 /usr/app/build  /usr/share/nginx/html
