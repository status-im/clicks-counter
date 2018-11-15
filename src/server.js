import Redis from 'async-redis'
import Logger from 'koa-logger'

import App from './app'
import Counter from './counter'

/* DEFAULTS */
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = process.env.REDIS_PORT || 6379
const LISTEN_PORT = process.env.LISTEN_PORT || 3000

const redis = Redis.createClient(REDIS_PORT, REDIS_HOST)
const counter = new Counter(redis)
const app = App(counter)

app.use(Logger())

app.listen(LISTEN_PORT)

console.log(`Redis connection: ${REDIS_HOST}:${REDIS_PORT}`)
console.log(`Started at: http://localhost:${LISTEN_PORT}/`)
