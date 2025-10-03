import crypto from 'node:crypto'
import fastify from 'fastify'
import { knex } from './database.js'

const app = fastify()

app.get('/hello', async () => {
	const transaction = await knex('transactions')
		.insert({
			id: crypto.randomUUID(),
			title: 'Transação de teste',
			amount: 500,
		})
		.returning('*')

	return transaction
})
app.get('/world', async () => {
	const transaction = await knex('transactions')
	.where('amount', 500)
	.select('*')

	return transaction
})

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log('HTTP Server Running!')
	})
