import Koa from 'koa'
import Router from 'koa-router'
import JSON from 'koa-json'

const App = (counter) => {
  const app = new Koa()
  const router = new Router()
  
  app.use(router.routes())
     .use(router.allowedMethods())
     .use(JSON({pretty: true}))

  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  })
  
  router.get('/health', async (ctx) => {
    ctx.body = 'OK'
  })

  /* Metrics related handlers */
  router.get('/metrics', async (ctx) => {
    ctx.body = await counter.metrics()
  })

  router.put('/clicks/:id', async ctx => {
    ctx.body = { [ctx.params.id]: await counter.incr(ctx.params.id) }
    ctx.status = 201
  })
  
  router.get('/clicks', async ctx => {
    ctx.body = await counter.list()
  })
  
  router.get('/clicks/:id', async ctx => {
    ctx.body = { [ctx.params.id]: await counter.state(ctx.params.id) }
  })

  return app
}

module.exports = App
