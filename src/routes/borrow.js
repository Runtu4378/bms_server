import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import borrowSQL from '../db/borrowsql'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

// 获取所有待还列表
router.get('/', (req, res) => {
  try {
    let { page, pageSize } = req.query
    page = parseInt(page, 10)
    pageSize = parseInt(pageSize, 10)
  
    if (!page || !pageSize) {
      return dealRes(res, 1, '分页信息错误！')
    }
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(borrowSQL.queryAll, [(page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) { throw err2 }
        connection.query(borrowSQL.countAll, (err3, count) => {
          connection.release()
          if (err3) { throw err3 }
          const { total } = count[0]
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
    console.log(e)
    return dealRes(res, 1, 'internal error')
  }
})

// 获取某用户待还列表
router.get('/user', (req, res) => {
  try {
    let { uid, page, pageSize } = req.query
    page = parseInt(page, 10)
    pageSize = parseInt(pageSize, 10)
  
    if (!page || !pageSize) {
      return dealRes(res, 1, '分页信息错误！')
    }
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(borrowSQL.queryUser, [uid, (page - 1) * pageSize, pageSize], (err2, result) => {
        if (err2) { throw err2 }
        connection.query(borrowSQL.countUser, [uid], (err3, count) => {
          connection.release()
          if (err3) { throw err3 }
          const { total } = count[0]
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
    console.log(e)
    return dealRes(res, 1, 'internal error')
  }
})

// 借阅
router.post('/', (req, res) => {
  try {
    const { uid, bid } = req.body
    if (!uid) {
      return dealRes(res, 1, '缺少用户id')
    } else if (!bid) {
      return dealRes(res, 1, '缺少图书id')
    }
    const now = new Date()
    pool.getConnection((err1, connection) => {
      if (err1) { throw err1 }
      connection.query(borrowSQL.check, [bid], (err2, result1) => {
        if (err2) { throw err2 }
        if (result1 && result1.length) {
          connection.release()
          return dealRes(res, 1, '本书已被借阅')
        }
        connection.query(borrowSQL.borrow, [uid, bid, now], (err3, result) => {
          if (err3) { throw err3 }
          connection.query(borrowSQL.markBorrow, [bid], (err4, result) => {
            connection.release()
            if (err4) { throw err4 }
            return dealRes(res, 0, '借阅成功')
          })
        })
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

export default router
