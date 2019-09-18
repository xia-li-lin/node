var mongoose=require('mongoose');

var Schema=mongoose.Schema;

module.exports=new Schema({
    // 关联字段---内容分类id
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    title:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    addTime:{
        type:Date,
        default:new Date()
    },
    views:{ // 阅读量
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default: ''
    },
    comments:{
        type:Array,
        default:[]
    }
});