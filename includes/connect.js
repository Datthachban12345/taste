// includes/connect.js
var express = require('express');
var app = express();
app.use(express.json()); // Để parse body dạng JSON
app.use(express.urlencoded({ extended: true })); 
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',  // Chỉ cho phép frontend ở localhost:3000
    methods: ['GET', 'POST', 'DELETE'],  // Các phương thức HTTP được phép
}));

app.set("view engine","ejs");
const path = require('path');
app.use(express.urlencoded({ extended: true }));
// Cấu hình thư mục views cho Express để nó biết tìm file EJS ở đâu
app.set('views', [path.join(__dirname, '..', 'modules', 'auth'), path.join(__dirname, '..', 'modules', 'users')]);
app.use(express.urlencoded({ extended: true }));
app.listen(3000, function() {
    console.log('Node server running @ http://localhost:3000');
});
app.use(express.urlencoded({ extended: true }))
const bookRoutes = require('../routes/book.router.js');
app.use('/', bookRoutes);

module.exports = app;

// app.get('/modules/auth/login.html', function (req, res) {
//     var sql = "SELECT * FROM book";
//     con.query(sql, function(err, results) {
//         if (err) {
//             console.error('MySQL query error:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         res.json(results); //hiển thị thông tin
//     });
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     var sql = "SELECT * FROM book";
//     con.query(sql, function(err, results) {
//       if (err) throw err;
//       console.log(results);
//     })
//   });
// module.exports = con;