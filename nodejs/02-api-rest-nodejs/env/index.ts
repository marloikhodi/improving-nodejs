import {config} from 'dotenv'
// import do .env gerando uma variavel global chamada process.env
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
	config({path: '.env.test'})
} else {
	config()
}

//process.env
//schema globla para o .env

const envSchema = z.object({
	//.object pois o process.env retorna um objeto
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), //enum -> uma entre
	DATABASE_URL: z.string(), //.nullable() caso nao fosse um valor obrigatorio
	PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('Invalid Enviroment Variables', _env.error.format())

	throw new Error('Invalid enviroment variables.')
}

export const env = _env.data
