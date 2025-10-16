import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions.js'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request, _reply) => {
	console.log(`[${request.method}, ${request.url}]`)
})
// dessa maneira o hook foi setado globalmente no fastify

app.register(transactionsRoutes, {
	prefix: 'transactions',
})
