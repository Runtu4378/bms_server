import express from 'express'
import mysql from 'mysql'
import dbConfig from '../db/config'
import userSQL from '../db/usersql'
import dealRes from '../utils/dealRes'

const router = express.Router()
// 使用数据库配置信息创建一个MySQL链接池
const pool = mysql.createPool(dbConfig.mysql)

const rbacPrivileges = [
  {
    privilegeId: 1,
    menu: '01',
    levelId: '001',
    path: '/setting',
    privilegeName: '系统设置',
    remark: 'remark',
  },
  {
    privilegeId: 2,
    menu: '01',
    levelId: '001001',
    path: '/setting/job',
    privilegeName: '职业设置',
    remark: 'remark',
  },
  {
    privilegeId: 3,
    menu: '01',
    levelId: '001002',
    path: '/setting/product',
    privilegeName: '作物设置',
    remark: 'remark',
  },
  {
    privilegeId: 4,
    menu: '01',
    levelId: '001003',
    path: '/setting/material',
    privilegeName: '材料设置',
    remark: 'remark',
  },
  {
    privilegeId: 5,
    menu: '01',
    levelId: '001004',
    path: '/setting/fish',
    privilegeName: '鱼类设置',
    remark: 'remark',
  },
  {
    privilegeId: 6,
    menu: '01',
    levelId: '001005',
    path: '/setting/map',
    privilegeName: '地图设置',
    remark: 'remark',
  },
  {
    privilegeId: 7,
    menu: '01',
    levelId: '002',
    path: '/notes',
    privilegeName: '各类笔记',
    remark: 'remark',
  },
  {
    privilegeId: 8,
    menu: '01',
    levelId: '002001',
    path: '/notes/product',
    privilegeName: '制作笔记',
    remark: 'remark',
  },
  {
    privilegeId: 9,
    menu: '01',
    levelId: '002002',
    path: '/notes/gather',
    privilegeName: '采集笔记',
    remark: 'remark',
  },
  {
    privilegeId: 10,
    menu: '01',
    levelId: '002003',
    path: '/notes/fish',
    privilegeName: '钓鱼笔记',
    remark: 'remark',
  },
]

router.get('/login', (req, res) => {
  const { uid } = req.query

  try {
    pool.getConnection((err, connection) => {
      connection.query(userSQL.getUserById, [uid], (err1, result) => {
        if (err1) throw new Error(err1)
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          // 释放连接池
          connection.release()
          return dealRes(res, 0, { user, rbacPrivileges })
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
  const { username, password } = req.body

  try {
    // 从连接池获取连接
    pool.getConnection((err, connection) => {
      connection.query(userSQL.userLogin, [username, password], (err1, result) => {
        if (err1) throw new Error(err1)
        if (result && result.length) {
          const user = result[0]
          delete user.pwd
          res.cookie('uidSave', user.id, {
            expires: new Date(Date.now() + (10 * 60000)), // 分钟
            httpOnly: false,
          })
          return dealRes(res, 0, { user, rbacPrivileges })
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
