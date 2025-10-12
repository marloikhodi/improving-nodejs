# Comandos Knex

"knex": "tsx ./node_modules/knex/bin/cli.js"

npm run knex -- migrate:make (nome-da-pasta) -> cria uma migrate
npm run knex -- migrate:latest -> roda a ultima migrate
npm run knex -- migrate:rollback -> rollback na ultima migrate
