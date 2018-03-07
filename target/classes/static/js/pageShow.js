(function(w,d,u){
	// var showContent = util.get('showContent');
	// if(!showContent){
	// 	return;
	// }
	// // var loading = new Loading();
	// // var layer = new Layer();
	var page = {
		// init:function(){
		// 	showContent.addEventListener('click',function(e){
		// 		var num = $("#allNum").html();
		// 		if(id != 0){
		// 			layer.reset({
		// 				content:'确认购买本内容吗？',
		// 				onconfirm:function(){
		// 					layer.hide();
		// 					loading.show();
		// 					$.ajax({
		// 						data:{"gid":id, "num":num},
		// 						url:'/record/buy',
		// 						type: 'POST',
		// 						success:function(result){
		// 							loading.result('购买成功',function(){location.href = './account.html';});
		// 						},
		// 						error:function(message){
		// 							loading.result(message||'购买失败');
		// 						}
		// 					});
		// 				}.bind(this)
		// 			}).show();
		// 			return;
		// 		}
		// 	}.bind(this),false);
		// },

		ui: function () {
            var userName = get_cookie("userName").toString();
            if(userName == "seller"){
                $("#edit").show();
            }
            else if(userName == "buyer"){
                $("#btnBuy").show();
                $("#btnAddCar").show();
			}
        }

	};
	page.ui();
	getName();
	show();
})(window,document);


function show(){
    var req = GetRequest();
    id = req['id'];
    if(id == null || id == 0){
        var result = util.getCookie("publish");
        $("#title").html(result['title']);
        $("#summary").html(result['summary']);
        $("#price").html(result['price']);
        $("#detail").html(result['detail']);
        $("#pic").attr('src', result['pic']);
       // util.deleteCookie("publish");
    }
    else{
        $.ajax({
            url: '/goods/get?id='+id,
            type: 'GET',
            dataType: 'json',
            success: function(result){
                $("#title").html(result['title']);
                $("#summary").html(result['summary']);
                $("#price").html(result['price']);
                $("#detail").html(result['detail']);
                $("#pic").attr('src', result['pic']);
                var userName = get_cookie("userName").toString();
                if(userName == "buyer" && result['isBuy'] == 1){
                    $("#buyed").show();
                    $("#buyPrice").html("当时购买价格： ￥" + result['price'] + "元");
                    $("#buyPrice").show();
                    $("#btnBuy").hide();
                    $("#btnAddCar").hide();
                }

            }
        });
    }

}

function edit(){
	location.href="edit.html?id="+id;
}
function sub(){
    var num = $('#allNum').html();
    if(num > 1){
        num --;
        $('#allNum').html(num);
    }else{
        alert("您至少要购买一件商品！");
    }
}

function add(){
    var num = $('#allNum').html();
	num++;
	$('#allNum').html(num);
}

function addCar(){
    var loading = new Loading();
    var layer = new Layer();
    var title = $("#title").html();
    var price = $("#price").html();
    var num = $('#allNum').html();
    var productDetail = {'id':id,'price':price,'title':title,'num':num};
    var name = 'products';
    var productList1 = new Array;
    var productList = util.getCookie(name);
    if(productList == "" || productList == null){
        productList1.push(productDetail);
        util.setCookie(name,productList1);
    }else if(util.findOne(productList,id)){
        util.modifyTwo(productList,id,num);
        util.setCookie(name,productList);
    }else{
        productList.push(productDetail);
        util.setCookie(name,productList);
    }
    console.log(document.cookie);
//		util.deleteCookie(name);
    layer.reset({
        content:'确认加入购物车吗？',
        onconfirm:function(){
            layer.hide();
            loading.show();
            loading.result('添加购物车成功');
        }.bind(this)
    }).show();
    return;
}

function buy(){
    var loading = new Loading();
    var layer = new Layer();
    var num = $("#allNum").html();
    if(id != 0) {
        layer.reset({
            content: '确认购买本内容吗？',
            onconfirm: function () {
                layer.hide();
                loading.show();
                $.ajax({
                    data: {"gid": id, "num": num},
                    url: '/record/buy',
                    type: 'POST',
                    success: function (result) {
                        if(result['code'] == 200){
							loading.result('购买成功', function () {
								location.href = './account.html';
							});
						}

						else{
                        	loading.result(result['message']);
						}
                    },
                    error: function (message) {
                        loading.result(message || '购买失败');
                    }
                });
            }.bind(this)
        }).show();
    }
}

