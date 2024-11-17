const db = require('../connect.js');
exports.get_list = function(req,res){
    Book.get_all(function(data){
        res.send({result:data});
    });
}
exports.detail = function(req,res){
    var data = Book.getById(req.params.id);
    res.send({result:data});
}
exports.add_book = function(req,res){   
    var data = {"id":15,"name":"hi"};
    Book.create(data, function(respnse){
        res.send({result:respnse});
    })
}