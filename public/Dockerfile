FROM nginx:latest
RUN mkdir -p /var/www/frontEnd/
COPY . /var/www/frontEnd/
LABEL maintainer="1986tianxie@sina.com"
WORKDIR /var/www/frontEnd/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 3333
ENTRYPOINT ["nginx", "-g", "daemon off;"]