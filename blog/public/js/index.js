$(function () {
    var $loginBox=$('#loginBox');
    var $registerBox=$('#registerBox');
    var $userInfo=$('#userInfo');
    var $logout=$('#logout');

    $loginBox.find('a.colMint').click(function () {
        $registerBox.show();
        $loginBox.hide();
    });

    $registerBox.find('a.colMint').click(function () {
        $registerBox.hide();
        $loginBox.show();
    });

    // 注册模块
    $registerBox.find('button').click(function () {
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val(),
            },
            dataType:'json',
            success:function (data) {
                console.log(data);
                $registerBox.find('.colWarning').html(data.message);
                if(!data.code){
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    },1000)
                }
            }
        });
    });

    // 登录模块
    $loginBox.find('button').click(function () {
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function (data) {
                $loginBox.find('.colWarning').html(data.message);
                if(!data.code){
                    window.location.reload();
                }
            }
        });
    });

    // 退出
    $logout.click(function () {
        $.ajax({
            url:'/api/user/logout',
            success:function (data) {
                if(!data.code){
                    window.location.reload();
                }
            }
        });
    });

});