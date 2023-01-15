FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG REACT_APP_BACKEND_URL

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html


# docker build . -t todo-front
# docker run -p 5000:80 todo-front