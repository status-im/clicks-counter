const Koa = require('koa');
const app = new Koa();


let LISTEN_PORT = 3000

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(LISTEN_PORT);
console.log(`Started at: http://localhost:${LISTEN_PORT}/`)
