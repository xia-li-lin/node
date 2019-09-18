var perpage=2;
var page=1;
var pages=0;
var comments=[];

// 提交评论
$('#messageBtn').click(function () {
    $.ajax({
        type:'post',
        url:'/api/comment/post',
        data:{
            contentId:$('#contentId').val(),
            content:$('#messageContent').val()
        },
        success:function (responseData) {
            console.log(responseData);
            $('#messageContent').val('');
            comments=responseData.data.comments.reverse();
            renderComment();
        }
    });
});

$.ajax({
    type:'get',
    url:'/api/comment',
    data:{
        contentId:$('#contentId').val()
    },
    success:function (responseData) {
        comments=responseData.data.reverse();
        renderComment();
    }
});

$('.pager').delegate('a','click',function () {
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment()
});

function renderComment() {
    var str='';
    var start=Math.max((page-1)*perpage,0);
    var end=Math.min(start+perpage,comments.length);
    $('#messageCount').html(comments.length);
    var $li=$('.pager li');
    pages=Math.max(Math.ceil(comments.length/perpage),1);
    $li.eq(1).html(page+' / '+pages);
    if(page<=1){
        page=1;
        $li.eq(0).html('<span>没有上一页了</span>');
    }else{
        $li.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if(page>=pages){
        page=pages;
        $li.eq(2).html('<span>没有下一页了</span>');
    }else{
        $li.eq(2).html('<a href="javascript:;">下一页</a>');
    }

    if(comments.length<1){
        str='<div class="messageBox"><p>还没有评论</p></div>';
    }else{
        for(var i=start;i<end;i++){
            console.log(comments[i]);
            str+=`<div class="messageBox">
                <p class="name clear">
                    <span class="fl">${comments[i].username}</span>
                    <span class="fr">${formatDate(comments[i].postTime)}</span>
                </p>
                <p>${comments[i].content}</p>
            </div>`;
        }
    }
    $('.messageList').html(str);
}

function formatDate(d) {
    var date=new Date(d);
    console.log(date);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();

    var h=date.getHours();
    var i=date.getMinutes();
    var s=date.getSeconds();
    return y+'/'+(m>9?m:'0'+m)+'/'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
}