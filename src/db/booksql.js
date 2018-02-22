const BookSQL = {  
  // insert: 'INSERT INTO book(uid,userName) VALUES(?,?)', 
  queryPage: 'SELECT * FROM book LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM book',
  queryValue: 'SELECT * FROM book WHERE name LIKE ? OR type In (?)',
}

export default BookSQL
