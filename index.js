var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');

});

// require('./app/routes/home.router');
// require('./app/routes/book.router');

app.listen(3000,function(){
    console.log("server listening on haha");
})