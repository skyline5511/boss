(function(w,d,u){
    var page = {
        init:function(){
            var req = GetRequest();
            id = req['id'];
            $.ajax({
                url: '/goods/get?id='+id,
                type: 'GET',
                dataType: 'json',
                success: function(result){
                    $("input[name='title']").val(result['title']);
                    $("input[name='summary']").val(result['summary']);
                    $("input[name='price']").val(result['price']);
                    $("#detail").val(result['detail']);
                    $("input[name='image']").val(result['pic']);
                    $("#imgpre").attr('src',result['pic']);
                }
            });

            $("input[name='image']").bind('input propertychange', function() {
                var value = $("input[name='image']").val().trim();
                if(value != "") {
                    $('#imgpre').attr('src', value);
                }
            });
        }
    };
    page.init();
    getName();
})(window,document);


function save(){
    var title = $("input[name='title']").val();
    var summary = $("input[name='summary']").val();
    var price =  $("input[name='price']").val();
    var detail = $("#detail").val();
    var pic = $("input[name='image']").val();
    var load = new Loading();
    $.ajax({
        data: {"id":id, "title":title, "summary":summary, "price":price, "detail":detail, "pic":pic},
        url: '/goods/update',
        type: 'POST',
        success: function (result) {
            load.result("保存成功！");
            location.href = "index.html";
        }
    });
}