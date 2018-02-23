import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import bookSQL from '../db/booksql'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

// 获取分页
router.get('/', (req, res) => {
  let { page, pageSize } = req.query
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)

  if (!page || !pageSize) {
    return dealRes(res, 1, '分页信息错误！')
  }

  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(bookSQL.queryPage, [(page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) { throw err2 }
        connection.query(bookSQL.count, (err3, count) => {
          if (err3) { throw err3 }
          const { total } = count[0]
          // 释放连接池
          connection.release()
          return dealRes(res, 0, {
            list: result,
            current: page,
            pageSize,
            total,
          })
        })
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 根据职业名称或是职业类别（01-大地使者、02-能工巧匠）来搜索职业
router.get('/query', (req, res) => {
  const { value } = req.query
  // 判断有无职业关键字
  let type
  const match01 = value.match(/^['大','地','使','者']+$/)
  const match02 = value.match(/^['能','工','巧','匠']+$/)
  if (match01) {
    type = ['01']
  } else if (match02) {
    type = ['02']
  } else {
    type = ['none']
  }
  try {
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      const query = `%${value}%`
      connection.query(bookSQL.queryValue, [query, type], (err2, result) => {
        if (err2) { throw err2 }
        // 释放连接池
        connection.release()
        return dealRes(res, 0, result)
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

// 新增图书
router.post('/', (req, res) => {
  try {
    const { code, name, description } = req.body
    if (!code) {
      return dealRes(res, 1, '缺少图书编码！')
    } else if (!name) {
      return dealRes(res, 1, '缺少图书名称！')
    }
    const now = new Date()
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(bookSQL.insert, [code, name, description, now, now], (err2, result) => {
        // 释放连接池
        connection.release()
        if (err2) { throw err2 }
        return dealRes(res, 0 , '添加成功！')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

export default router
