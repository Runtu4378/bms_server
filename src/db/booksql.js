const BookSQL = {  
  insert: 'INSERT INTO book(code, name, description, createTime, updateTime) VALUES(?, ?, ?, ?, ?)', 
  queryPage: 'SELECT * FROM book LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM book',
  queryValue: 'SELECT * FROM book WHERE name LIKE ? OR type In (?)',
}

export default BookSQL
