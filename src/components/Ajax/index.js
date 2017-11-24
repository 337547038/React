/**
 * 通讯模块 
 * 用于解决前端与后端的通信
 */
var Ajax = (function() {
	//请求，参数为一个字面直接量对象
	var _ajax = function(conf) {
		var config ={
			method:'get',
			url:'',
			data:'',
			async:true,
			cache:true,
			contentType:'application/x-www-form-urlencoded',
			success:function(){},
			failure:function(){}
		}
		
		for(var key in conf){
			config[key] = conf[key];
		}
		//通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
		if(!config.cache){
			config.url = config.url + '?rand=' + Math.random();
		}
		config.data = _translateParams(config.data); //通过_translateParams()将名值对转换成字符串
		config.method = config.method.toLowerCase();
		//若是GET请求，则将数据加到url后面
		if(config.method === 'get') {
			config.url += config.url.indexOf('?') == -1 ? '?' + config.data : '&' + config.data;
		}
		//定义XHR对象
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		//在使用XHR对象时，必须先调用open()方法，
		//它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
		xhr.open(config.method, config.url, config.async);
		if(config.method === 'post') {
			//post方式需要自己设置http的请求头，来模仿表单提交。
			//放在open方法之后，send方法之前。
			xhr.setRequestHeader('Content-Type',config.contentType);
			xhr.send(config.data); //post方式将数据放在send()方法里
		} else {
			xhr.send(null); //get方式则填null
		}
		if(config.async === true) { //true表示异步，false表示同步
			//使用异步调用的时候，需要触发readystatechange 事件
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) { //判断对象的状态是否交互完成
					_callback(); //回调
				}
			};
		}else{ //同步
			_callback();//回调
		}

		var _callback = function() {
			if(xhr.status == 200) { //判断http的交互是否成功，200表示成功
				config.success(xhr.responseText); //回调传递参数
			} else {
				config.failure(xhr.status,xhr.statusText);
			}
		}
	}
	//名值对转换为字符串
	var _translateParams = function(data) {
		var arr = [];
		for(var i in data) {
			//特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	}

	return {
		ajax:function(config){
			_ajax(config);
		},
		get: function(config) {
			config.method = 'get';
			_ajax(config);
		},
		post: function(config) {
			config.method = 'post';
			_ajax(config);
		}
	}
})();

module.exports = Ajax;