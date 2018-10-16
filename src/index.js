const Koa = require('koa')
const Router = require('koa-router')
const JSON = require('koa-json')

const Counter = require('./counter')
const Redis = require('async-redis')

/* DEFAULTS */
const REDIS_HOST = 'localhost'
const REDIS_PORT = 6379
const LISTEN_PORT = 3000

const app = new Koa()
const router = new Router()
const redis = Redis.createClient(REDIS_PORT, REDIS_HOST)
const counter = new Counter(redis)

router.put('/click', async ctx => {
    counter.incr()
    ctx.body = { 'counter': await counter.state() }
});

router.get('/clicks', async ctx => {
    ctx.body = { 'counter': await counter.state() }
});

app.use(JSON({pretty: true}))
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(LISTEN_PORT)
console.log(`Started at: http://localhost:${LISTEN_PORT}/`)
