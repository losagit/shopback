const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'mysql-galaxsystem.alwaysdata.net',
  user     : '272819',
  password : 'mysql54710',
  database : 'galaxsystem_dbshop'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }else{
      console.log('connected as id ' + connection.threadId);
  }
});

module.exports = connection;