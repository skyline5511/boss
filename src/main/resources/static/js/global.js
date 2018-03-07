function get_cookie(Name) {
    var search = Name + "="//查询检索的值
    var returnValue = "";//返回值
    if (document.cookie.length > 0) {
        sd = document.cookie.indexOf(search);
        if (sd!= -1) {
            sd += search.length;
            end = document.cookie.indexOf(";", sd);
            if (end == -1)
                end = document.cookie.length;
            //unescape() 函数可对通过 escape() 编码的字符串进行解码。
            returnValue=unescape(document.cookie.substring(sd, end))
        }
    }
    return returnValue;
}

function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

function logout(){
    $.ajax(
        {
            url: '/api/logout',
            type: 'POST',
            success: function(){
                util.deleteCookie("userName");
                location.href = "/login.html";
            }
        }
    );
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

(function(w,d,u){
	var f = function(){};

	var formatParams =function(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
    };

	var util = {
		get:function(id){
			return d.getElementById(id);
		},
		serialize:function(data){
			if(!data) return '';
			var arr = [];
			for(var name in data){
				if(!data.hasOwnProperty(name)) continue;
				if(typeof data[name]==='function') continue;
				var value = data[name].toString();
				name = encodeURIComponent(name);
				value = encodeURIComponent(value);
				arr.push(name + '=' + value);
			}
			return arr.join('&');
		},
        findOne:function(array,id){
            return array.filter(function(item){
                return item.id == id;
            })[0];
        },
        modifyOne:function(array,id,num){
            var item = this.findOne(array,id);
            item.num = num;
        },
        modifyTwo:function(array,id,num){
            var item = this.findOne(array,id);
            item.num = parseInt(item.num) + parseInt(num);
        },
        getCookie:function(name){
            var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
            result && (result = JSON.parse(result[1]));
            return result;
        },
        setCookie:function(name,value){
            var cookie = [name, '=', JSON.stringify(value)].join('');
            document.cookie = cookie;
        },
        deleteCookie:function(name) {
            if (this.getCookie(name))
                this.setCookie(name, "", -1);
        }
	};

    var ajax = function(options) {
        var options = options || {};
        options.type = (options.type || "POST").toUpperCase();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var status = xhr.status;
                if(status >= 200 && status < 300 || status == 304){
                	var json = JSON.parse(xhr.responseText);
                	if(json && json.code == 200){
                		options.success && options.success(json.result);
                	}else{
                		options.error && options.error(json.message);
                	}
                }else{
                    options.error && options.error('请求失败');
                }
            }
        }
        if(options.type == "POST"){
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(util.serialize(options.data));
        }else{
        	xhr.open("GET", options.url + "?" + formatParams(options.data), true);
            xhr.send(null);
        }
    }    

	//layer
	var Layer = function(){
		this.init();
	}
	Layer.prototype = {
		init:function(){
			this.isConfirmed = false;
			this.template ='<div class="m-winwrapper">\
							    <div class="winwrapper">\
							        <div class="m-win m-win-simple">\
							            <div class="winhd"><h2 class="wintt">{title}</h2></div>\
							            <div class="winbd">{content}</div>\
							            <div class="winft">\
							                <button type="button" class="u-btn u-btn-primary u-btn-fw" data-action="confirm">{confirmText}</button>\
							                <button type="button" class="u-btn u-btn-normal u-btn-fw" data-action="cancel">取消</button>\
							            </div>\
							        </div>\
							    </div>\
							</div>';
			this.body = d.createElement('div');
			this.body.style.display = 'none';
			d.body.appendChild(this.body);
			this.body.addEventListener('click',function(e){
				var ele = e.target;
				var action = ele.dataset && ele.dataset.action;
				if(action == 'confirm'){
					this.confirm();
					return;
				}
				if(action == 'cancel'){
					this.hide();
					return;
				}
			}.bind(this),false);
		},
		reset:function(options){
			var options = options || {};
			this.title = options.title || '提示';
			this.content = options.content || '';
			this.confirmText = options.confirmText || '确定';
			this.onconfirm = options.onconfirm || f;
			this.isConfirmed = false;
			return this;
		},
		confirm:function(){
			if(!this.isConfirmed){
				this.onconfirm();
			}
			this.isConfirmed = true;
		},
		rend:function(){
			var html = this.template.replace('{title}',this.title).replace('{content}',this.content).replace('{confirmText}',this.confirmText);
			this.body.innerHTML = html;
		},
		show:function(){
			this.isConfirmed = false;
			this.rend();
			this.body.style.display = '';
		},
		hide:function(){
			this.isConfirmed = false;
			this.body.style.display = 'none';
		}
	};
	
	//loading
	var Loading = function(){
		this.init();
	}
	Loading.prototype = {
		init:function(){
			this.template ='<div class="v-load {class}"><div class="load"><i></i><b>{message}</b></div></div>';
			this.body = d.createElement('div');
			this.body.style.display = 'none';
			this.timer = null;
			d.body.appendChild(this.body);
		},
		rend:function(data){
			var html = data ? this.template.replace('{class}','v-load-result').replace('{message}',data.message) : this.template;
			this.body.innerHTML = html;
		},
		show:function(){
			this.rend();
			this.body.style.display = '';
		},
		result:function(message,callback){
			if(!message){
				return;
			}
			this.rend({message:message});
			if(this.timer){
				w.clearTimeout(this.timer);
			}
			this.timer = w.setTimeout(function(){
				this.hide();
				callback && callback();
			}.bind(this),1500);
		},
		hide:function(){
			this.body.style.display = 'none';
		}
	};

	var getName = function(){
		var userName = get_cookie("userName");
		if(userName != null){
			if(userName == "buyer"){
                $("#name").text('买家你好，buyer!');
                $("#account").show();
                $("#car").show();
                $("#public").hide();
			}
			else {
                $("#name").text('卖家你好，seller!');
                $("#public").show();
                $("#account").hide();
                $("#car").hide();
			}
            $("#name").show();
            $("#logout").show();
            $("#qing").hide();
            $("#login").hide();
		}
        else {
            ajax({
                url: '/user/getName',
                success: function(result){
                    if(result == "buyer"){
                        $("#name").text('买家你好，buyer!');
                        $("#account").show();
                        $("#car").show();
                        $("#public").hide();
                    }
                    else{
                        $("#name").text('卖家你好，seller!');
                        $("#public").show();
                        $("#account").hide();
                        $("#car").hide();
                    }
                    $("#name").show();
                    $("#logout").show();
                    $("#qing").hide();
                    $("#login").hide();
                },
                error: function(message){
                    $("#name").hide();
                    $("#logout").hide();
                    $("#qing").show();
                    $("#login").show();
                    $("#account").hide();
                    $("#public").hide();
                    $("#car").hide();
                }
            });
		}
	}

	w.util = util;
	w.ajax = ajax;
	w.Layer = Layer;
	w.Loading = Loading;
	w.getName = getName;
})(window,document);

