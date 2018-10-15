var express=require('express');
var app=express();
const bodyParser = require('body-parser');
var http=require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');
app.use(express.static('./')); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors');
const port = process.env.PORT || 9000;
app.use(cors());
require("./controller/controller.js")(app,io);

http.listen(port,function(){
    console.log("Node Server is setup and it is listening on http://"+ip.address()+":9000");
})