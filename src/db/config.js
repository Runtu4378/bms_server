export default {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bms_db', // 前面建的user表位于这个数据库中 
    port: 3306,
    connectionLimit: 10,
  },
}
