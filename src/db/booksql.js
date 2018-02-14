const JobSQL = {  
  // insert: 'INSERT INTO user(uid,userName) VALUES(?,?)', 
  queryPage: 'SELECT * FROM job LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM job',
  queryValue: 'SELECT * FROM job WHERE name LIKE ? OR type In (?)',
}

export default JobSQL
