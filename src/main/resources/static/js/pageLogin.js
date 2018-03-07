// (function(w,d,u){
// 	var loginForm = util.get('loginForm');
// 	if(!loginForm){
// 		return;
// 	}
// 	var userName = loginForm['userName'];
// 	var password = loginForm['password'];
// 	var isSubmiting = false;
// 	var loading = new Loading();
// 	var page = {
// 		init:function(){
// 			loginForm.addEventListener('submit',function(e){
// 				if(!isSubmiting && this.check()){
// 					var value1 = userName.value;
// 					var value2 = md5(password.value);
// 					isSubmiting = true;
// 					loading.show();
// 					ajax({
//                         async: false,
// 						data: {userName:value1,password:value2},
// 						url: '/api/login',
// 						success:function(result){
// 							loading.hide();
// 							location.href = '/index.html';
// 						},
// 						error:function(message){
// 							loading.result(message||'登录失败');
// 							isSubmiting = false;
// 						}
// 					});
// 				}
// 			}.bind(this),false);
// 			[userName,password].forEach(function(item){
// 				item.addEventListener('input',function(e){
// 					item.classList.remove('z-err');
// 				}.bind(this),false);
// 			}.bind(this));
// 		},
// 		check:function(){
// 			var result = true;
// 			[
// 				[userName,function(value){return value == ''}],
// 				[password,function(value){return value == ''}]
// 			].forEach(function(item){
// 				var value = item[0].value.trim();
// 				if(item[1](value)){
// 					item[0].classList.add('z-err');
// 					result = false;
// 				}
// 				item[0].value = value;
// 			});
// 			return result;
// 		}
// 	};
// 	page.init();
// })(window,document);


function login(){
	var userName = $("#userName").val();
	var password = $("#password").val();
    var isSubmiting = false;
 	var loading = new Loading();
    if(!isSubmiting){
    	password = md5(password);
    	isSubmiting = true;
    	loading.show();
        $.ajax({
            async: false,
			data: {"userName": userName, "password": password},
			type: 'POST',
			url: '/api/login',
			dataType: 'json',
			success:function(result){
            			if(result.code == 200){
                            loading.hide();
                            document.cookie = "userName="+result.result;
                            location.href = '/index.html';
						}
						else {
                            loading.result('密码错误！');
                            isSubmiting = false;
						}
					},
			error:function(message){
				loading.result(message||'登录失败');
				isSubmiting = false;
			}
        }
       );
	}
}
