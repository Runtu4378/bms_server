// 路由规则存放目录
import upload from './upload'
import user from './user'
import book from './book'

const router = (app) => {
  app.get('/', (req, res, next) => {
    res.render('./index.html')
  })

  app.all('/api/*', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Origin', 'http://localhost:8014')
    next()
  })

  app.use('/api/upload', upload)
  app.use('/api/user', user)
  app.use('/api/book', book)
}

export default router
