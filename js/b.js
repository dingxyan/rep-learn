// var xml = new XMLHttpRequest();
// xml.open("get","http://localhost:3000/json/test.js",true);
// xml.send();
// xml.onreadystatechange=function(){
// 	if(xml.readyState==4 && xml.status==200){
// 		console.log(xml.responseText)
// 	}
// }

// function Send(opt){
// 	var me = this;
// 	var opt = {
// 		type: opt.type||"get",
// 		sendType: opt.sendType||"json",
// 		data: opt.data||{},
// 		sucCallback:opt.sucCallback,
// 		asyn: opt.asyn||false,
// 		url: opt.url
// 	}
// 	if(opt.sendType=="json"){
// 		var xml = new XMLHttpRequest();
// 		if(opt.type=="get"){
// 			var data = formatSendData(opt.data);
// 			var url = opt.url+"?"+data;
// 			xml.open(opt.type,url,opt.asyn);
// 			xml.send();
// 		}else if(opt.type=="post"){
// 			xml.open(opt.type,opt.url,opt.asyn);
// 			xml.send(opt.data);
// 		}
// 		xml.onreadystatechange = function(data){
// 			if(xml.readyState==4 && xml.status==200){
// 				console.log(data)
// 			}
// 		}
// 	}else if(opt.sendType=="jsonp"){
// 		var dom = document.createElement("script");
// 		var url = "http://localhost:3000/json/test2.js?callback=callback";
// 		dom.setAttribute("src",url);
// 		var head = document.getElementsByTagName("head")[0];
// 		head.appendChild(dom);

// 		window["callback"] = function(data){
// 			head.remove(dom);
// 			console.log(data)
// 		}
// 	}
// }
// function formatSendData(data){
// 	var end = "";
// 	for(key in data){
// 		end+=encodeURIComponent(key)+"="+encodeURIComponent(data[key]);
// 	}
// }

require(["jquery"],function([$]){
	$.ajax({
		url:"",
		type:"get",
		json:"jsonp",
		success:function(data){}
	})
})
