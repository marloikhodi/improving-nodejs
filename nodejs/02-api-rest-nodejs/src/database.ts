import setupKnex, { type Knex } from 'knex'
import { env } from '../env/index.js'

export const config: Knex.Config = {
	client: env.DATABSE_CLIENT,
	connection: env.DATABSE_CLIENT === 'sqlite' ?{
		filename: env.DATABASE_URL,
	} : env.DATABASE_URL,
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './db/migrations',
	},
}

export const knex = setupKnex(config)
