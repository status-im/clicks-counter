import app from './app'

/* DEFAULTS */
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = process.env.REDIS_PORT || 6379
const LISTEN_PORT = process.env.LISTEN_PORT || 3000

app.listen(LISTEN_PORT)
console.log(`Redis connection: ${REDIS_HOST}:${REDIS_PORT}`)
console.log(`Started at: http://localhost:${LISTEN_PORT}/`)
