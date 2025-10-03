import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	// Mudança que vai fazer na tabela
	await knex.schema.createTable('transactions', (table) => {
		table.uuid('id').primary()
		table.text('title').notNullable()
		table.decimal('amount', 18, 2).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable() // knex.fn.now() salva a data atual, independente do BD utilizado
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('transactions')
} // "Rollback" -> remove tabelas ao contrario do metodo up
