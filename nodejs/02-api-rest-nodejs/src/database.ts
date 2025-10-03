import Knex, { type Knex as TypeKnex } from 'knex'

export const config: TypeKnex.Config = {
	client: 'sqlite',
	connection: {
		filename: './db/app.db',
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './db/migrations',
	},
}

export const knex = Knex(config)
