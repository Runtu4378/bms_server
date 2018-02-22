import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import userSQL from '../db/usersql'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

router.get('/login', (req, res) => {
  const { uidSave: uid } = req.cookies

  try {
    pool.getConnection((err, connection) => {
      connection.query(userSQL.getUserById, [uid], (err1, result) => {
        if (err1) throw new Error(err1)
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          // 释放连接池
          connection.release()
          return dealRes(res, 0, user)
        }
        // 释放连接池
        connection.release()
        return dealRes(res, 1, '用户不存在，请重新登录！')
      })
    })
  } catch (e) {
    return dealRes(res, 1, 'internal error')
  }
})

router.post('/login', (req, res, next) => {
  const { account, pwd } = req.body

  try {
    // 从连接池获取连接
    pool.getConnection((err, connection) => {
      connection.query(userSQL.userLogin, [account, pwd], (err1, result) => {
        if (err1) throw new Error(err1)
        if (result && result.length) {
          const user = result[0]
          res.cookie('uidSave', user.id, {
            expires: new Date(Date.now() + (10 * 60000)), // 分钟
            httpOnly: false,
          })
          // 释放连接池
          connection.release()
          return dealRes(res, 0, user)
        }
        // 释放连接池
        connection.release()
        return dealRes(res, 1, '用户不存在！')
      })
    })
  } catch (e) {
    // console.log(e)
    return dealRes(res, 1, 'internal error')
  }
})

export default router
