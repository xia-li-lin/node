var express=require('express');
var swig=require('swig');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var Cookies=require('cookies');
var app=express();
var User=require('./models/User');

// 设置静态文件托管
app.use('/public',express.static(__dirname+'/public'));
// 配置应用模版
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req,res,next) {
   req.cookies=new Cookies(req,res);
   req.userInfo={};
   if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));
            // 获取当前登录用户类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                next();
            });
        }catch (e) {
            console.log(e);
            next();
        }
   }else{
       next();
   }
});
app.use('/',require('./routers/main'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

mongoose.connect('mongodb://localhost:27018/blog',function (err) {
    if(err){
        console.log('连接失败！');
    }else{
        console.log('连接成功！');
        app.listen(8080);
    }
});
