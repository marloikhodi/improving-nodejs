# Comandos Knex

npm install --save-dev ts-node typescript

knex migrate:make migration_name -x ts
knex migrate:rollback
knex migrate:latest

"knex": "tsx ./node_modules/knex/bin/cli.js"

npm run knex -- migrate:make (nome-da-pasta) -> cria uma migrate
npm run knex -- migrate:latest -> roda a ultima migrate
npm run knex -- migrate:rollback -> rollback na ultima migrate

https://knexjs.org/guide/schema-builder.html#dropcolumns:~:text=name%20to%20another.-,increments,-%23

https://knexjs.org/guide/migrations.html#seed-files
