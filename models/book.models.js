// models/book.models.js
const db = require('../models/db.js'); // Nhập từ db.js để tránh phụ thuộc vòng lặp

const Book = function(book) {
    this.id = book.id;
    this.name = book.name;
};
const News = function(news){
    this.id = news.id;
    this.name = news.name;
}

News.get_all = function(result){
    db.query("SELECT * FROM news",function(err,news){
        if (err) {
            console.log("Error: ", err);
            result(null);
        } else {
            result(news);
        }
    })
}
News.remove = function(id,result){
    db.query("DELETE FROM news WHERE id = ?",id,function(err,res){
        if (err) {
            console.error("Lỗi khi xóa:", err);
            result(null); // Xóa thất bại
        } else if (res.affectedRows === 0) {
            result(null); // Không tìm thấy bản ghi
        } else {
            result("Xóa thành công"); // Xóa thành công
        }
    })
}
News.update = function(active,id,result){
    db.query("UPDATE news SET active = ? WHERE id = ?",[active,id],function(err,res){
        if (err) {
            console.error("Lỗi khi cập nhật:", err);
            result(null); // Trả về null nếu có lỗi
        } else if (res.affectedRows === 0) {
            result(null); // Nếu không có bản ghi nào bị ảnh hưởng (thường là khi không tìm thấy id)
        } else {
            result("Cập nhật thành công"); // Trả về thông báo thành công
        }
    })
}

// Book.get_all = function(result) {
//     db.query("SELECT * FROM book", function(err, books) {
//         if (err) {
//             console.log("Error: ", err);
//             result(null);
//         } else {
//             result(books);
//         }
//     });
// };
// Book.create = function(data,result){
//     db.query("INSERT INTO book SET ?",data,function(err,book){
//         if(err){
//             result(null);
//         }
//         else{
//             result({id: book.insertId,...data});
//         }
//     })
// }
// Book.remove = function(id,result){
//     db.query("DELETE FROM book WHERE id = ?",id,function(err,book){
//         if(err){
//             result(null);
//         }
//         else{
//             result("xóa thành công");
//         }
//     })
// }

module.exports = { Book, News };
