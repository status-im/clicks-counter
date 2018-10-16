const Koa = require('koa')
const Router = require('koa-router')
const JSON = require('koa-json')
const Counter = require('./counter')


/* DEFAULTS */
let LISTEN_PORT = 3000

const app = new Koa()
const router = new Router()

router.put('/click', async ctx => {
    Counter.incr()
    ctx.body = { 'counter': Counter.state() }
});

router.get('/clicks', async ctx => {
    ctx.body = { 'counter': Counter.state() }
});

app.use(JSON({pretty: true}))
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(LISTEN_PORT)
console.log(`Started at: http://localhost:${LISTEN_PORT}/`)
