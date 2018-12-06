var mysql = require('mysql');

var db = mysql.createConnection({
	host: 'step4.c22vwamy1vuf.us-east-2.rds.amazonaws.com',
	port: 3306,
	database: 'step4',
	user: 'step4',
	password: 'SoftwareDev123'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to website");
});

module.exports = db;