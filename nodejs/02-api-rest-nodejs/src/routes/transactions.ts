import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database.js'

export async function transactionsRoutes(app: FastifyInstance) {
	// isso é um plugin do fastify

	app.post('/', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body,
		)

		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
		})

		reply.status(201).send()
	})
}
