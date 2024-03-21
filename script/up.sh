docker-compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml run --rm view yarn
docker compose -f docker-compose.prod.yml run --rm view yarn build
docker compose -f docker-compose.prod.yml up -d
