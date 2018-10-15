var mongoose = require('mongoose');
const config = require('./../config/configuration');
var Schema = mongoose.Schema;
var dbURI = "mongodb://localhost:27017/chat";
const connectDB = mongoose.connect(config.database,(err)=>{
    if(err){
      console.log("Warning! Database not connected");
    }else{
      console.log("Database connected"); 
    }
    });
    
module.exports.user=mongoose.model('User',new Schema({
    name:String,
    handle: String,
    password: String,
    phone:String,
    email:String,
    friends:[]
},{strict: false}));
module.exports.online=mongoose.model('online',new Schema({
    handle:String,
    connection_id:String
}));
module.exports.messages=mongoose.model('message',new Schema({
    message : String,
    sender  : String,
    reciever: String,
    date    : Date
}));