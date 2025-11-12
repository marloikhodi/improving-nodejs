import{execSync} from 'node:child_process'

processo do node para executar comandos no cmd

beforeEach (()=> {
execSync('npm run knex -- migrate:rollback')
execSync('npm run knex -- migrate:latest')
})

