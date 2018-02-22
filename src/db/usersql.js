const UserSQL = {
  // insert: 'INSERT INTO user(uid,userName) VALUES(?,?)',
  // queryAll: 'SELECT * FROM user',
  getUserById: 'SELECT id, username, type FROM user WHERE id = ? ',
  userLogin: 'SELECT id, username, type FROM user WHERE ( account = ? AND password = ? )',
}

export default UserSQL
