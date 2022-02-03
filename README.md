# game_profile_tool


初回起動時
docker-compose build
docker-compose run --rm api python app/db/database.py
docker-compose run --rm front yarn install
docker-compose run --rm front yarn build
docker-compose up -d

本番向け
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

