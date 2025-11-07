import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database.js'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.js'

export async function transactionsRoutes(app: FastifyInstance) {
	// app.addHook('preHandler', async (request, reply) => {
	// 	console.log(`[${request.method}, ${request.url}]`)
	// })
	// dessa maneira o hook foi setado globalmente porem dentro da rota transaction
	app.get(
		'/',
		{
			preHandler: [checkSessionIdExists],
		},
		async (request) => {
			const { sessionId } = request.cookies

			const transactions = await knex<Transactions>('transactions')
				.where('session_id', sessionId)
				.select() // não é necessário o * para puxar todos os campos

			return {
				transactions,
			}
		},
	)

	app.get(
		'/:id',
		{
			preHandler: [checkSessionIdExists],
		},
		async (request) => {
			const getTransactionParamsSchema = z.object({
				id: z.uuid(),
			})

			const { id } = getTransactionParamsSchema.parse(request.params)

			const { sessionId } = request.cookies

			const transaction = await knex<Transactions>('transactions')
				.where('id', id)
				.andWhere('session_id', sessionId)
				.first() //.first indica ao knex que somente existe um resultado, nao devolvendo um array

			return {
				transaction,
			}
		},
	)

	app.get(
		'/summary',
		{
			preHandler: [checkSessionIdExists],
		},
		async (request) => {
			const { sessionId } = request.cookies

			const summary = await knex<Transactions>('transactions')
				.where('session_id', sessionId)
				.sum('amount', {
					as: 'amount',
				})
				.first()

			return {
				summary,
			}
		},
	)

	app.post('/', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body,
		)

		let { sessionId } = request.cookies

		if (!sessionId) {
			sessionId = randomUUID()

			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			})
		}

		await knex<Transactions>('transactions').insert({
			id: randomUUID(),
			title,
			amount: 'credit' === type ? amount : amount * -1,
			session_id: sessionId,
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
