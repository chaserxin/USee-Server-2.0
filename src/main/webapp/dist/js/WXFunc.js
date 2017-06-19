function getRoomName() {
    var roomID = getQueryStringByName('roomid');
    var roomName = "匿名房间";
    jsonhttp = new XMLHttpRequest();
    var getdmurl = 'http://www.useeba.com/USee/gettopicinfo';   //
    jsonhttp.open("POST", getdmurl, false);
    var data = '{"topicID":"' + getTopicID() + '"}';
    jsonhttp.send(data);
    result = jsonhttp.responseText;
    ref = eval("(" + result + ")");
    var ownerName = ref.topic.title;

    roomName = ownerName + " 的房间 ";

    if (roomID == 0) {
        roomName = "创建房间中。。。。"
    }

    if (roomID == 18) {
        roomName = "CSCW 2017";
    }

    return roomName;

}


function getImage() {
    var roomID = getQueryStringByName('roomid');
    // var roomName = "匿名房间";
    jsonhttp = new XMLHttpRequest();
    var getdmurl = 'http://www.useeba.com/USee/gettopicinfo';   //
    jsonhttp.open("POST", getdmurl, false);
    var data = '{"topicID":"' + getTopicID() + '"}';
    jsonhttp.send(data);
    result = jsonhttp.responseText;
    ref = eval("(" + result + ")");
    var url = ref.topic.imgurls[0];



    return url;

}

function createRoom() {

    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3321fb7bc0c69e5&redirect_uri=' + encodeURIComponent('http://www.useeba.com/USee/DanmuWX2.html?roomid=0') + '&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

    location.href = url;

    // Ajax to get the new code ~
    var access_code = getQueryStringByName('code');
    var roomID = getQueryStringByName('roomid');
    if (access_code == null) {
        alert("抱歉，未能创建房间，飞速修复中。。。")
    }
    else {

        redirectToRoom(access_code);

    }
}

function redirectToRoom(access_code) {

    $.ajax({
        type: 'get',
        url: 'http://www.useeba.com/USee/wx/login/userinfo',
        async: false,
        cache: false,
        data: {code: access_code, state: '123'},
        dataType: 'json',
        success: function (result) {
            if (result != null && result.hasOwnProperty('wxRoomId') && result.wxRoomId != "") {

                // addcookie('userId',result.userId,360000);
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3321fb7bc0c69e5&redirect_uri=' + encodeURIComponent('http://www.useeba.com/USee/DanmuWX2.html?roomid=' + result.wxRoomId) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';

                location.href = url;
            }
            else {
                alert('微信身份识别失败 \n ' + result);
                location.href = fromurl;
            }
        }
    });
}

$(function () {
    var userId = getcookie('userId');
    var key = getcookie('key');
    var roomID = getQueryStringByName('roomid');

    if (roomID == 0) {

        var access_code = getQueryStringByName('code');
        redirectToRoom(access_code);
    }

    if (key == '') {
        var access_code = getQueryStringByName('code');

        if (userId == "") {
            if (access_code == null) {
                var fromurl = location.href;
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3321fb7bc0c69e5&redirect_uri=' + encodeURIComponent('http://www.useeba.com/USee/DanmuWX2.html?roomid=' + roomID) + '&response_type=code&scope=snsapi_base&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
                location.href = url;
            }
            else {
                $.ajax({
                    type: 'get',
                    url: 'http://www.useeba.com/USee/wx/login/base',
                    async: false,
                    cache: false,
                    data: {code: access_code, state: '123'},
                    dataType: 'json',
                    success: function (result) {
                        if (result != null && result.hasOwnProperty('userId') && result.userId != "") {
                            addcookie('userId', result.userId, 360000);
                        }
                        else {
                            alert('微信身份识别失败 \n ' + result);
                            location.href = fromurl;
                        }
                    }
                });
            }
        } else {
            if (key == '' && userId != '') {

            }
            // alert('Got Nothing!');
            // getlogininfo(userId);
        }

        function getlogininfo(userId) {
            $.ajax({
                type: 'get',
                url: ApiUrl + '/index.php?act=login&op=autologininfo',
                data: {userId: userId},
                dataType: 'json',
                async: false,
                cache: false,
                success: function (result) {
                    if (result.return_code == 'OK') {
                        addcookie('key', result.memberinfo.key);
                        addcookie('username', result.memberinfo.username);
                    } else {
                        alert(result.return_msg);
                        location.href = WapSiteUrl + '/tmpl/member/login.html';
                    }
                }
            });
        }
    }
});


function addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    //判断是否设置过期时间  
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name)return decodeURIComponent(arr[1]); //增加对特殊字符的解析
    }
    return "";
}

function delCookie(name) {//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}


function repoFooter() {
    var wh = $(window).height();
    highPo = wh * 0.6 + 'px';
    currentHip = $('#footer').css("bottom");
    // alert(highPo == currentHip);
    var msg = $('#dmmessage').val();

    if (currentHip == "0px") {
        $('#footer').css("bottom", wh * 0.6 + "px");
    }
    else if (msg.length < 1) {
        $('#footer').css("bottom", "0px");
    }
}

function returnFooter() {
    $('#footer').css("bottom", "0px");
}

function fixedWatch(el) {
    if (document.activeElement.nodeName == 'INPUT') {
        el.css('position', 'static');
    } else {
        el.css('position', 'fixed');
    }
}

function upload(){}




