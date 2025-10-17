import request from 'supertest'
import { afterAll, beforeAll, test } from 'vitest'
import { app } from '../src/app.js'

beforeAll(async () => {
	await app.ready() //abre o servidor antes de tudo
})

afterAll(async () => {
	await app.close()
})

test('User can create a new transition', async () => {
	await request(app.server)
		.post('/transactions')
		.send({
			title: 'New Transaction',
			amount: 5000,
			type: 'credit',
		})
		.expect(201)
})
