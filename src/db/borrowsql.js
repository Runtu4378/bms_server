const BorrowSQL = {  
  check: 'SELECT'
  + ' * FROM borrow'
  + ' WHERE'
  + ' bid = ? AND isReturn = 00',
  borrow: 'INSERT'
  + ' INTO borrow(uid, bid, date)'
  + ' VALUES(?, ?, ?)',
  // 标记借阅
  markBorrow: 'UPDATE'
  + ' book'
  + ' SET isBorrow = \'01\''
  + ' WHERE id = ?',
  // 取消借阅标记
  markReturn: 'UPDATE'
  + ' book'
  + ' SET isBorrow = \'00\''
  + ' WHERE id = ?',
  queryAll: 'SELECT'
  + ' b.id, b.code, b.name, b.description, bo.date'
  + ' FROM book as b, borrow as bo'
  + ' WHERE b.id = bo.bid AND bo.isReturn = \'00\''
  + ' LIMIT ?,?',
  countAll: 'SELECT'
  + ' COUNT(*) AS total FROM book AS b, borrow AS bo'
  + ' WHERE b.id = bo.bid AND bo.isReturn = \'00\'',
  queryUser: 
    'SELECT'
    + ' b.id, b.code, b.name, b.description, bo.date'
    + ' FROM book AS b, borrow AS bo'
    + ' WHERE b.id = bo.bid AND bo.isReturn = \'00\' AND bo.uid = ?'
    + ' LIMIT ?,?',
  countUser: 
    'SELECT'
    + ' COUNT(*) AS total FROM book AS b, borrow AS bo'
    + ' WHERE b.id = bo.bid AND bo.isReturn = \'00\' AND bo.uid = ?',
}

export default BorrowSQL
