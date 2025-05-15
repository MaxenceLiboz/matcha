FROM node:lts

RUN apt update -y

COPY ./config/frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /frontend
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]