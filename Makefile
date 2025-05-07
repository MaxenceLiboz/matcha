all: start

start:
	docker compose up -d

stop:
	docker compose down

reset:
	docker compose down -v --rmi "all"

run-database:
	docker exec -it database bash

run-backend:
	docker exec -it backend bash

run-frontend:
	docker exec -it frontend bash