FROM node:10.16.3

RUN mkdir -p /code
WORKDIR /code
COPY . .
RUN yarn
EXPOSE 3333