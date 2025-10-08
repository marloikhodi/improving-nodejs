import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database.js'

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/', async () => {
		const transactions = await knex<Transactions>('transactions').select() // não é necessário o * para puxar todos os campos

		return {
			transactions,
		}
	})

	app.get('/:id', async (request) => {
		const getTransactionParamsSchema = z.object({
			id: z.uuid(),
		})

		const { id } = getTransactionParamsSchema.parse(request.params)

		const transaction = await knex<Transactions>('transactions')
			.where('id', id)
			.first() //.first indica ao knex que somente existe um resultado, nao devolvendo um array

		return {
			transaction,
		}
	})

	app.get('/summary', async () => {
		const summary = await knex<Transactions>('transactions')
			.sum('amount', {
				as: 'amount',
			})
			.first()

		return { summary }
	})

	app.post('/', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body,
		)

		await knex<Transactions>('transactions').insert({
			id: randomUUID(),
			title,
			amount: 'credit' === type ? amount : amount * -1,
		})

		reply.status(201).send()
	})
}

interface Transactions {
	id: string
	title: string
	amount: number
	created_at: string
	session_id?: string
}
