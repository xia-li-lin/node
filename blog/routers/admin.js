var express=require('express');
var router=express.Router();
var User=require('../models/User');
var Category=require('../models/Category');
var Content=require('../models/Content');

function pagination(req,res,InstanceName,url,Association){
    var page=Number(req.query.page || 1);
    var limit=10;
    var pages=0;

    InstanceName.count().then(function (count) {
        pages=Math.ceil(count/limit);
        page=Math.min(page,pages);
        page=Math.max(page,1);
        var skip=(page-1)*limit;
        InstanceName.find().limit(limit).skip(skip).populate(Association).then(function (data) {
            res.render(url,{
                userInfo:req.userInfo,
                datas:data,
                page:page,
                count:count,
                pages:pages,
                limit:limit
            })
        });
    });
}

router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
       // 非管理员
       res.send('对不起，只有管理员可以进入后台管理');
       return;
    }
    next();
});

// 首页
router.get('/',function (req,res,next) {
    res.render('admin/index',{
        userInfo:req.userInfo
    });
});

// 用户管理
router.get('/user',function (req,res,next) {
    pagination(req,res,User,'admin/user',null);
});

// 分类管理
router.get('/category',function (req,res,next) {
    pagination(req,res,Category,'admin/category',null);
});

// 添加分类
router.get('/category/add',function (req,res,next) {
    res.render('admin/category_add',{
        userInfo:req.userInfo
    });
});

// 分类的保存
router.post('/category/add',function (req,res,next) {
    var name=req.body.name;
    if(name==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'名称不能为空'
        });
        return;
    }

    Category.findOne({
        name:name
    }).then(function (data) {
        if(data){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类已经存在'
            });
            return Promise.reject();
        }else{
            return new Category({name:name}).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'分类添加成功',
            url:'/admin/category'
        });
    });
});

// 分类修改
router.get('/category/edit',function (req,res) {
    var id=req.query.id || '';
    Category.findOne({_id:id}).then(function (category) {
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
        }else{
            res.render('admin/category_edit',{
                userInfo:req.userInfo,
                category:category
            });
        }
    });
});

// 分类的修改保存
router.post('/category/edit',function (req,res) {
    var id=req.query.id || '';
    var name=req.body.name || '';

    Category.findOne({_id:id}).then(function (category) {
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else{
            if(name==category.name){
                res.render('admin/error',{
                    userInfo:req.userInfo,
                    message:'分类信息没发生变化',
                    url:'/admin/category'
                });
                return Promise.reject();
            }else{
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                });
            }
        }
    }).then(function (sameCategory) {
        if(sameCategory){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'数据库中已经存在同名的分类'
            });
            return Promise.reject();
        }else{
            return Category.update({
                _id:id
            },{
                name:name
            });
        }
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改成功'
        });
    });
});

// 分类删除
router.get('/category/delete',function (req,res) {
    var id=req.query.id || '';
    Category.remove({
        _id:id
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        });
    });
});

// 内容首页
router.get('/content',function (req,res) {
    pagination(req,res,Content,'admin/content',['category','user']);
});

// 内容添加
router.get('/content/add',function (req,res) {
    Category.find().sort({_id:-1}).then(function (categories) {
        res.render('admin/content_add',{
            userInfo:req.userInfo,
            categories:categories
        })
    });
});

// 内容保存
router.post('/content/add',function (req,res) {
    // console.log(req.body);
    if(req.body.category==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'分类不能为空'
        });
        return;
    }

    if(req.body.title==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'标题不能为空'
        });
        return;
    }

    if(req.body.content==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'内容不能为空'
        });
        return;
    }

    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content,
    }).save().then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'内容保存成功',
            url:'/admin/content'
        });
    });
});

// 修改内容
router.get('/content/edit',function (req,res) {
    var id=req.query.id || '';

    Content.findOne({_id:id}).populate('category').then(function (content) {
        if(!content){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'指定内容不存在',
                url:'/admin/content_edit'
            });
            return Promise.reject();
        }else{
            // console.log(content);
            Category.find().sort({_id:1}).then(function (categories) {
                res.render('admin/content_edit',{
                    userInfo:req.userInfo,
                    content:content,
                    categories:categories
                });
            });
        }
    });
});

// 修改内容保存
router.post('/content/edit',function (req,res) {
    var id=req.query.id || '';
    Content.update(
        {_id:id},
        {
            category:req.body.category,
            title:req.body.title,
            description:req.body.description,
            content:req.body.content
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改成功',
            url:'/admin/content'
        });
    });
});

// 内容删除
router.get('/content/delete',function (req,res) {
    var id=req.query.id || '';
    Content.remove({
        _id:id
    }).then(function () {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/content'
        });
    });
});

module.exports=router;