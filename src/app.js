import Koa from 'koa'
import Router from 'koa-router'
import JSON from 'koa-json'
import Logger from 'koa-logger'

const App = (counter) => {
  const app = new Koa()
  const router = new Router()
  
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });
  
  router.put('/clicks/:id', async ctx => {
    counter.incr(ctx.params.id)
    ctx.body = { [ctx.params.id]: await counter.state(ctx.params.id) }
    ctx.status = 201
  });
  
  router.get('/clicks', async ctx => {
    ctx.body = await counter.list()
  });
  
  router.get('/clicks/:id', async ctx => {
    ctx.body = { [ctx.params.id]: await counter.state(ctx.params.id) }
  });
  
  app.use(Logger())
     .use(JSON({pretty: true}))
     .use(router.routes())
     .use(router.allowedMethods())

  return app
}

module.exports = App
