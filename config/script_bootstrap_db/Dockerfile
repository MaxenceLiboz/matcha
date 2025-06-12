FROM python:3.9

COPY ./config/script_bootstrap_db/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY ./config/script_bootstrap_db/script /script
RUN chmod +x /script

