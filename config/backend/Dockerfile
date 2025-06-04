FROM node:lts

RUN apt update -y

COPY ./config/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /backend
