all: start

start:
	docker compose up -d --force-recreate

stop:
	docker compose down 

re: reset start

reset:
	docker compose down -v --rmi "all"

run-database:
	docker exec -it database bash

run-backend:
	docker exec -it backend bash

run-frontend:
	docker exec -it frontend bash