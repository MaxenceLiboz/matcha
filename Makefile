all: start

start:
	docker compose up --force-recreate -d

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

restart-backend:
	docker compose restart backend

restart-frontend:
	docker compose restart frontend

restart-database:
	docker compose restart database