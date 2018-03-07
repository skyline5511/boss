(function(w,d,u){
    var page = {
        init:function(){
            var req = GetRequest();
            id = req['id'];
            $.ajax({
                url: '/record/getRecord',
                type: 'POST',
                dataType: 'json',
                success: function(result){
                    var table = $("#recordTable");
                    var label = "";
                    var sum = 0;
                    for(var i = 0; i<result.length; i++){
                        var record = result[i];
                        label = label + "<tr>";
                        label = label + "<td><a href='show.html?id=" + record.gid + "'><img src='" + record.picture + "' alt='" + record.title + "'></a></td>";
                        label = label + "<td><h4><a href='show.html?id=" + record.gid + "'>" + record.title + "</a></h4></td>";
                        label = label + "<td><span class='v-time'>" + record.time + "</span></td>";
                        label = label + "<td><span>" + record.num + "</span></td>";
                        label = label + "<td><span class='v-unit'>￥</span><span class='v-value'>" + record.price + "</span></td>";
                        label = label + "</tr>";
                        sum = sum + record.price * record.num;
                    }
                    table.html(label);
                    $("#sum").html(sum);
                }
            });
        }
    };
    page.init();
    getName();
})(window,document);

/*
<tr>
    <td><a href="show.html"><img src="http://nec.netease.com/img/s/1.jpg" alt=""></a></td>
    <td><h4><a href="show.html">内容名称</a></h4></td>
    <td><span class="v-time">2016-03-12 12:12</span></td>
    <td><span class="v-unit">¥</span><span class="value">123.9</span></td>
</tr>
*/