FROM node:lts

RUN apt update -y

COPY ./config/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# COPY ./docker/backend.entrypoint.sh /entrypoint.sh

# COPY ./shared ./shared

# COPY ./config/.back-dev.env /config/.back-dev.env


WORKDIR /frontend
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]