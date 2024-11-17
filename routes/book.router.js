const express = require('express');
const router = express.Router();
const { Book, News } = require('../models/book.models.js');

// Route để lấy tất cả các sách
// router.get('/login', function(req, res) {
//     Book.get_all(function(books) {
//         if (!books) {
//             res.status(500).send({ message: "Error retrieving books" });
//         } else {
//             res.render('login',{dat: books});
//         }   
//     });
// });

// router.get('/test', function(req, res) {
//     Book.get_all(function(books) {
//         if (!books) {
//             res.status(500).send({ message: "Error retrieving books" });
//         } else {
//             res.render('test',{books: books});
//         }   
//     });
// });
// router.post('/delete-book', function(req, res) {
//     const bookId = req.body.id; // Lấy id từ form
//     if (!bookId) {
//         return res.status(400).send('ID is required');
//     }

//     // Gọi phương thức remove từ model Book để xóa sách
//     Book.remove(bookId, function(message) {
//         if (message) {
//             res.redirect('/books'); // Sau khi xóa, chuyển hướng lại danh sách sách
//         } else {
//             res.status(500).send('Error deleting book');
//         }
//     });
// });
router.get('/news',function(req,res){
    News.get_all(function(news) {
        if (!news) {
            res.status(500).send({ message: "Error retrieving books" });
        } else {
            res.render('news',{news: news});
        }   
    });
})
// Route xử lý xóa
router.delete("/news/:id", (req, res) => {
    const id = req.params.id;
    News.remove(id, (result) => {
        if (!result) {
            res.status(500).json({ message: "Xóa thất bại" });
        } else {
            res.status(200).json({ message: result });
        }
    });
});
router.put('/news/:id',function(req,res){
    const active = req.body.active;
    const id = req.params.id;   

    News.update(active,id,(update) => {
        if (!update) {
            res.status(500).json({ message: "Update không thành công" });
        } else {
            res.status(200).json({ update: update });
        }   
    });
})
module.exports = router;