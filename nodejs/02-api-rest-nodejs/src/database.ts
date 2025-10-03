import 'dotenv/config'
// import do .env gerando uma variavel global chamada process.env
import setupKnex, { type Knex } from 'knex'

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL env not found')
}

export const config: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: './db/app.db',
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: process.env.DATABASE_URL, 
	},
}

export const knex = setupKnex(config)
