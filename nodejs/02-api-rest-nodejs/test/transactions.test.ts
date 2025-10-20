import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import{execSync} from 'node:child_process'
import { app } from '../src/app.js'

describe('Transactions routes', () => {
	// maneira de nomear o teste, possivel inserir subcategorias da mesma maneira dentro de outra
	beforeAll(async () => {
		await app.ready() // abre o servidor antes de tudo
	})

	afterAll(async () => {
		await app.close() // fecha o servidor depois de tudo
	})

	beforeEach (()=> {
		execSync('npm run knex -- migrate:rollback') //dando drop no banco
		execSync('npm run knex -- migrate:latest') // subindo o banco
	})

	it('sould be able to create a new transition', async () => {
		//it e test sao a mesma coisa, it fica mais semantico em ingles
		await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 5000,
				type: 'credit',
			})
			.expect(201)
	})

	it('should be able to list all transactions', async () => {
		const createTransactionResponse = await request(app.server)
			.post('/transactions')
			.send({
				title: 'Listed Transaction',
				amount: 5000,
				type: 'credit',
			})

		const cookies = String(createTransactionResponse.get('Set-Cookie'))

		const listTransactionsResponse = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200)

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'Listed Transaction',
				amount: 5000,
			}),
		])
	})
})
//
