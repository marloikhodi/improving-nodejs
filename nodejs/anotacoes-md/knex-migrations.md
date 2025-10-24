# Comandos Knex

npm install --save-dev ts-node typescript

$ knex migrate:make migration_name -x ts

"knex": "tsx ./node_modules/knex/bin/cli.js"

npm run knex -- migrate:make (nome-da-pasta) -> cria uma migrate
npm run knex -- migrate:latest -> roda a ultima migrate
npm run knex -- migrate:rollback -> rollback na ultima migrate
