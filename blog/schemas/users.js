var mongoose=require('mongoose');

var Schema=mongoose.Schema;

module.exports=new Schema({
   username:String,
   password:String,
   // 是否是管理员
   isAdmin:{
      type:Boolean,
      default:false
   }
});