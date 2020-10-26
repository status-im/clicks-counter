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

  const clickIncrement = async ctx => {
    const id = ctx.params[0]
    ctx.body = { [id]: await counter.incr(id) }
    ctx.status = 201
  }

  /* Use regex to reduce chance of inserting non-valid values */
  router.post(/^\/clicks\/([a-z]+:[a-z]{3})$/, clickIncrement)
  
  router.get('/clicks', async ctx => {
    ctx.body = await counter.list()
  })
  
  router.get('/clicks/:id', async ctx => {
    ctx.body = { [ctx.params.id]: await counter.state(ctx.params.id) }
  })

  return app
}

module.exports = App
