FROM mysql:lts

COPY ./config/database/create_db.sql /docker-entrypoint-initdb.d/create_db.sql
RUN chmod +x /docker-entrypoint-initdb.d/create_db.sql

WORKDIR /scripts

