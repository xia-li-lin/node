var express=require('express');
var router=express.Router();
var Category=require('../models/Category');
var Content=require('../models/Content');
var data;

// 通用数据--中间件
router.use(function (req,res,next) {
    data={
        userInfo:req.userInfo,
        categories:[]
    };
    Category.find().then(function (categories) {
        data.categories=categories;
        next();
    });
});

router.get('/',function (req,res,next) {
    data.page=Number(req.query.page || 1);
    data.limit=2;
    data.pages=0;
    data.count=0;
    data.contents=[];
    data.category=req.query.category || '';
    var where={};
    if(data.category){
        where.category=data.category;
    }
    Content.where(where).count().then(function (count) {
        data.count=count;
        data.pages=Math.ceil(data.count/data.limit);
        data.page=Math.min(data.page,data.pages);
        data.page=Math.max(data.page,1);
        var skip=(data.page-1)*data.limit;
        return Content.find().where(where).limit(data.limit).skip(skip).populate(['category','user']).sort({addTime:1});
    }).then(function (contents) {
        data.contents=contents;
        // console.log(data);
        res.render('main/index',data);
    });
});

router.get('/view',function (req,res) {
   var contentId=req.query.contentId || '';
   Content.findOne({
       _id:contentId
   }).then(function (content) {
       data.contents=content;
       content.views++;
       content.save();
       res.render('main/view',data);
   });
});

module.exports=router;