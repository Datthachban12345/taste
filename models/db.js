// includes/db.js
var mysql = require('mysql');

var db = mysql.createConnection({
    host: '127.0.0.1', // hoặc 'localhost'
    user: 'root',
    password: '',
    database: 'taste'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the MySQL database!");
});

module.exports = db; // Xuất đối tượng kết nối
