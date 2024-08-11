/*
 * @Date: 2024-03-04 17:31:02
 * @LastEditors: phil
 */
import koa from 'koa'
import Router from 'koa-router'
import route from 'koa-route'
import cors from 'koa2-cors'
import webSocket from 'koa-websocket'
import AppRoutes from './src/routes/index.js'
import { PORT } from './src/utils/index.js'

const router = new Router()

AppRoutes.map(({path, method, action}) => router[method](path, action))

const app = webSocket(new koa())

app.ws.use((ctx, next) => {
  ctx.websocket.send('connection successed!')
  return next(ctx)
})


app.ws.use(
  route.all('/test', (ctx) => {
    // ctx.websocket.send('hello world')
    ctx.webSocket.on('message', message => {
      console.log(message)


      ctx.websocket.send('1111')
    })
  })
)

app.use(cors)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
