(function(w,d,u){
	var plist = util.get('plist');
	if(!plist){
		return;
	}
	var layer = new Layer();
	var loading = new Loading();
	var page = {
		init:function(){
			plist.addEventListener('click',function(e){
				var ele = e.target;
				var delId = ele.dataset && ele.dataset.del;
				if(delId){
					this.ondel(delId);
					return;
				}
			}.bind(this),false);

			var userName = get_cookie("userName");
			if(userName == "buyer"){
				$("#unBuy").show();
			}
		},
		ondel:function(id){
			layer.reset({
				content:'确定要删除该内容吗？',
				onconfirm:function(){
					layer.hide();
					loading.show();
					$.ajax({
						url:'/goods/delete',
						data:{"id":id},
						type: 'POST',
						success:function(result){
							this.delItemNode(id);
							loading.result('删除成功');
						}.bind(this)
					});
				}.bind(this)
			}).show();
		},
		delItemNode:function(id){
			var item = util.get(id);
			if(item && item.parentNode){
				item.parentNode.removeChild(item);
			}
		}
	};
	page.init();
	getName();
	getList();
})(window,document);


function getList(){
	var userName = get_cookie("userName").toString();
	$.ajax({
		url: '/goods/getList',
		type: 'POST',
		dataType: 'json',
		success: function (result) {
            for(var i = 0; i<result.length; i++){
                var goods = result[i];
                var label = "<li id='"+goods.id+"' data-buy='" + goods.isBuy + "'>"
                    + "<a href='show.html?id=" + goods.id + "' class='link'>"
                    +     "<div class='img'><img src='" + goods.pic +"' alt='" + goods.title + "'></div>"
                    +     "<h3>" + goods.summary + "</h3>"
                    +     "<div class='price'><span class='v-unit'>¥</span><span class='v-value'>" + goods.price + "</span>";
                if(userName == "buyer"){
                	if(goods.isBuy == 1){
                        label = label +  "</div><span class='had'><b>已购买</b></span></a></li>";
					}
				}
				else if(userName == "seller"){
                	if(goods.isSell == 1){
                        label = label +  "<span class='v-tips'>已售出" + goods.selledNum + "件</span></div><span class='had'><b>已售出</b></span></a></li>";
					}
                    else{
                        label = label + "</div></a><span class='u-btn u-btn-normal u-btn-xs del' data-del='" + goods.id + "'>删除</span></li>";
					}
                }
                else {
                	label = label + "</div></a></li>";
                    $("#unBuy").hide();
				}
                $("#plist").append(label);
            }
        },
		error: function (message) {
			
        }
	});
}

function unBuy() {
	$("#all").removeClass("z-sel");
    $("#unBuy").addClass("z-sel");
    $("#plist").each(function () {
        $(this).find('li').each(function() {
        	if($(this).attr("data-buy") == 1){
                $(this).hide();
			}
        });

    });
}


