
		var serverPrefix = 'http://www.useeba.com/USee/wx/wxroom/'; // http://114.215.209.102/USee/  114.215.209.102
		var footerClosed = 0;
		
		// TODO:  Remove Duplications	
		function danmumethod(){
		  var method = 'http://www.useeba.com/USee/getdmbytopic';   // 
		  return method;
		}
		
		function titlemethod(){
		  var method = serverPrefix+'gettopictitle';   //  
		  return method;
		}
		
      function sendmethod(){
      var method = 'http://www.useeba.com/USee/senddanmu';   //  
      return method;
    }

        function createTopic(url) { 

          // var url = $("#J_PicturePreview").attr("src");

          var upImage = document.getElementById('upImage')

          console.log(upImage.src);

          var yuan = document.getElementById('yuan')
          var xi = document.getElementById('xi')
          var banji = document.getElementById('class')
          var phone = document.getElementById('phone')

          if(yuan.value==="" || xi.value ==="" || banji.value === "" || phone.value ===""){
            alert("请填写完整");
          }
          else{
            // // var topicID = 273;
                var sendInfo = '{"title":"'+yuan.value+" "+xi.value+" "+banji.value+'","imgurls":["'+ upImage.src +'"],"description":"最美毕业照'+ phone.value +'","radius":"1000","lon":"118.7868","lat":"31.9173","userid":"1D112E3896804F27B00D35C7421EE962"}';
                console.log(sendInfo);
                // alert(sendInfo);
                
                $.ajax({
                       type: "POST",
                       url: "http://www.useeba.com/USee/createtopic",
                       contentType: "application/json",
                       dataType: "json",
                       success: function (msg) {
                          // alert(msg);
                           jQuery("#erweima").qrcode({
                            text : "http://www.useeba.com/USee/DanmuWX2.html?roomid="+msg.id
                           })
                           var lianjie = document.getElementById('lianjie')
                           lianjie.innerHTML = '<br>以上是你的房间地址二维码，请妥善保存<br>这里是<a href="http://www.useeba.com/USee/DanmuWX2.html?roomid='+ msg.id +'" target="_blank" rel="external">你的浏览房间地址</a>'
                       },
                       async : false,
                  error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    
                                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                            } ,
                       data: sendInfo
                   });
          }


          
       }

    // TODO REDO The send method ...
		function send() {	
		var topicID = 273;
		var sendInfo = '{"topicid":"'+topicID+'"}';
		// alert(sendInfo);
		
		$.ajax({
           type: "POST",
           url: serverPrefix+"getDanmubyTopic",
           contentType: "application/json",
           dataType: "json",
           success: function (msg) {
           		alert(msg);
               if (msg) {
                   alert("Somebody" + " was added in list !");
               } else {
                   alert("Cannot add to list !");
               }
           },
           async : false,
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                } ,
           data: sendInfo
       });
       }


       function sendDanmu(method){
            var jsonhttp = null ;
            jsonhttp = new XMLHttpRequest();
            var getdmurl = method;  
            jsonhttp.open("POST", getdmurl,false);
            roomID = getTopicID();
            str = $("#dmmessage").val();
            unistr = escape(str).replace(/%u/gi, '\\u');
    
            cnstr = unescape(str).replace(/%u/gi, '\\u')
            userID = getcookie('userId')
            // alert('Sending... UID='+userID);
            // var data = '{"devId": "1","wxRoomId": 3,"userId": "0A276E3A023848A7BB791BC1957B371F","messages":"'+str+'"}';
            var data = '{"delete_time":"2020-01-01 10:10:10","devid": "1","isannoymous":false,"lat":"31.917352","lon":"118.786877","topicid":'+roomID+',"userid":"'+ userID +'","messages":"'+cnstr+'","randomUserIcon":"6_E6A473","randomUserName":"Merry","randomIconId":598,"imgurls":[]}';
            jsonhttp.send(data);
            result = jsonhttp.responseText;
            // alert(result);
            str = $("#dmmessage").val("");
            $('#footer').css("bottom", "0px"); 
            reloadDM();
       }
       
       // Get First 100 danmu each time 
    function getDanmu(method) {
     	var jsonhttp = null ;
		jsonhttp = new XMLHttpRequest();
		var getdmurl = method;   // 
		jsonhttp.open("POST", getdmurl,false);
		var data = '{"topicid":"'+getTopicID()+'","pagesize":"1000","pagenum":"1"}';
		jsonhttp.send(data);
		result = jsonhttp.responseText;
		ref =eval("("+result+")");
		return ref.danmu;
		}
		
		 function getTitle(method) {
     	var jsonhttp = null ;
		jsonhttp = new XMLHttpRequest();
		var getdmurl = method;   // 
		jsonhttp.open("POST", getdmurl,false);
		var data = '{"topicID":"'+getTopicID()+'"}';
		jsonhttp.send(data);
		result = jsonhttp.responseText;
		ref =eval("("+result+")");
		return ref;
		}
		
		
	function  barrager(){
		
  		if(run_once){
      		//如果是首次执行,则设置一个定时器,并且把首次执行置为false	  		
      		var totalDM = ref.length;
      		var maxLength =0 ;
      		
      		for (i =0;i<totalDM;i++) {
      			  currentLen	 = ref[i].messages.length;
      			  if(maxLength < currentLen) {
      			  			maxLength = currentLen;
      			  }
      		}
          
      		var window_width = $(window).width()  ;

			// 控制弹幕密度
			var speedRatio =0.2

			if(window_width <800) {
					speedRatio =0.2;
			}

			looper_time=maxLength/ speedRatio; // 

			if(looper_time < 120) {
					looper_time = 200;
			}

			looper=setInterval(barrager,looper_time*10); 
      	 	run_once=false;
  		}
  		
  		if( index ==0){
  			 time_elasped =0;
  		}
  		//发布一个弹幕
  		// 注册用户的URL可以取得
  		// 非注册用户 渲染 Or 随机头像 'img':'barrager.png'
  		// TODO Remove the URL
  		
      var danmu_i={'info':convertEmoji(ref[total-index-1].messages),'speed':1,'id':ref[total-index-1].id};
        
  		$('body').barrager(danmu_i);
  		index++;
  		//  定期刷新，获取新弹幕
  		
  		if (time_elasped > refreshInterval) {
  				reloadDM();
  		}
  		
  		//所有弹幕发布完毕，清除计时器, 轮播
 		 if(index == total){
 		 		// clear_barrage();
      			index =0;  //  开始轮播
      			time_elasped =0;
      			run_once=false;
      	}
	}
		
    function reloadDM()
    {
      index =0;  //  开始轮播
      time_elasped =0;
      run_once=false;
      method = danmumethod();
      ref = getDanmu(method);
      total = ref.length;
      barrager();
    }

		function timedCount()
		{
			time_elasped=time_elasped+1;
			t = setTimeout("timedCount()",1000)
		}
		
    	function  clear_barrage(){
        	$.fn.barrager.removeAll();
    	}
		
    	function getTopicID(){		//获取QuerryString中的TopicID
			return getQueryStringByName("roomid");
	}
	
		function getTopicTitle(){		//获取QuerryString中的TopicID
			return getQueryStringByName("title");
		}
	
	
		function getQueryStringByName(name){		//根据QuerryString中的Key获取其Value
     		var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    		if(result == null || result.length < 1){
         		return "";
     		}
     return result[1];
	}
	
   function sleep(numberMillis) { 
			var now = new Date(); 
			var exitTime = now.getTime() + numberMillis; 
			while (true) { 
				now = new Date(); 
				if (now.getTime() > exitTime) 
				return; 
			} 
	}
	
// 自带Emoji字符串的转换
function convertEmoji(str){
    subStrings = str.split(']');
    result = "";
    
	for (i =0; i < subStrings.length;i++) {
     if ( subStrings[i].indexOf("/") >= 0 ) {
       //1. 提取Emoji字符串
    	emoji = subStrings[i].substr(subStrings[i].indexOf("/"),subStrings[i].length);
    	prefix = subStrings[i].substr(0,subStrings[i].indexOf("/"));
    	emoji = emoji + "]";
    
    	// 2. 查表把/YYY] 变成  <img>	
    	for (j=0;j<mappings.length;j++) {
    	        emj = mappings[j].match(emoji);
    			if ( emj != null && typeof(emj) !== "undefined") {
    					// alert(mappings[j]);
    					res = mappings[j].split('|');
    					imgIcon = res[1];
    					imgIcon = "static/emoji/"+imgIcon+".png";
    					result=result + prefix+ '<img src="'+imgIcon+'" style ="width: 24px;height: 24px">';
    			}
    		}
    	}
    	else { // No Emoji, remains the same.
    		result+=subStrings[i];
    	}
    }  // End For 
    
    return result;
   }

		   
		$(function(){
				$("#closeButton").click(function(){
				$("#footer").css("display","none");//点击隐藏
				footerClosed = 1;
		});
		});


	
