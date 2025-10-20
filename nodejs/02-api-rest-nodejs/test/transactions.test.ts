import request from 'supertest'
import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '../src/app.js'

describe('Transactions routes', () => {
	// maneira de nomear o teste, possivel inserir subcategorias da mesma maneira dentro de outra
	beforeAll(async () => {
		await app.ready() // abre o servidor antes de tudo
	})

	afterAll(async () => {
		await app.close() // fecha o servidor depois de tudo
	})

	it('sould be able to create a new transition', async () => { //it e test sao a mesma coisa, it fica mais semantico em ingles 
		await request(app.server)
			.post('/transactions')
			.send({
				title: 'New Transaction',
				amount: 5000,
				type: 'credit',
			})
			.expect(201)
	})
})
//