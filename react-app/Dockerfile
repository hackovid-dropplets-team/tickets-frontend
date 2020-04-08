# MULTISTAGE BUILD =============================================================



# STAGE 1: BUILD ENVIRONMENT ---------------------------------------------------

FROM node:12-slim as build

RUN mkdir app-docker

# Bundle app source
ADD . app-docker

WORKDIR app-docker

RUN yarn
RUN yarn build:prod

# CMD ["yarn", "start:prod"]



# STAGE 2: PRODUCTION ENVIRONMENT ----------------------------------------------

FROM nginx

COPY --from=build /app-docker/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
