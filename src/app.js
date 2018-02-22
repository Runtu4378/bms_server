import express from 'express'
import path from 'path'
import http from 'http'
import consolidate from 'consolidate'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression' // gzip压缩插件
import debugObj from 'debug'
import { port } from './config'
import Router from './routes/index'

const app = express()
const isDev = app.get('env') !== 'production'

// const debug = debugObj('express')
// debugObj.enable('express')
// debug.log = console.info.bind(console)

app.use(compression()) // 启用 gzip压缩

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', consolidate.ejs)

// app.use(bodyParser()) // for parsing application/jso
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.text()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true,
})) // for parsing application/x-www-form-urlencoded

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../uploads')))

Router(app)

if (isDev) {
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
} else {
  // static assets served by express.static() for production
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
  })
}
