export default {
  mysql: {
    host: '120.78.152.254',
    // host: '192.168.31.200',
    user: 'db_user',
    password: 'db_pass',
    database: 'handbookDB', // 前面建的user表位于这个数据库中 
    port: 3306,
    connectionLimit: 10,
  },
}
