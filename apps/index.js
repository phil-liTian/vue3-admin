/*
 * @Date: 2024-03-04 17:31:02
 * @LastEditors: phil
 */
import path from 'path'
import koa from 'koa'
import Router from 'koa-router'
import route from 'koa-route'
import body from 'koa-body'
import koaStatic from 'koa-static'
import cors from 'koa2-cors'
import webSocket from 'koa-websocket'
import AppRoutes from './src/routes/index.js'
import { fileURLToPath } from 'url'
import { PORT } from './src/utils/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

app.use(cors())
app.use(
  body.default({
    encoding: 'gzip',
    multipart: true,
    formidable: {
      // uploadDir: path.join(__dirname, '/upload/'), // 设置文件上传目录
      keepExtensions: true,
      maxFieldsSize: 20 * 1024 * 1024,
    },
  }),
);

app.use(router.routes())
app.use(router.allowedMethods())
app.use(koaStatic(__dirname))

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
