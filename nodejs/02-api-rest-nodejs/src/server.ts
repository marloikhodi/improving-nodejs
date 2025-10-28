import { env } from '../env/index.js'
import { app } from './app.js'

app
	.listen({
		port: env.PORT,
		host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost',
	})
	.then(() => {
		console.log('HTTP Server Running!')
	})
