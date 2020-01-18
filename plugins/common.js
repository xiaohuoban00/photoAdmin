var ipAddr="http://192.168.187.9:9000";
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var mill2date = function (string) {
    return new Date(string).Format("yyyy-MM-dd hh:mm:ss")
};
function add(id) {
    var formData = new FormData();
    formData.append('image', $(id)[0].files[0]);  //添加图片信息的参数
    var src;
    $.ajax({
        url: ipAddr+"/upload",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        data: formData,
        processData: false,// 不处理数据
        contentType: false, // 不设置内容类型
        success: function (data) {
            src=data.url[0];
        },
    });
    return src;
}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
function strMapToObj(strMap){
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
/**
 *map转换为json
 */
function mapToJson(map) {
    return JSON.stringify(strMapToObj(map));
}
var adminInfo;
$.ajax({
    url:ipAddr+"/admin/verify",
    type:"get",
    dataType:"json",
    async: false,
    xhrFields: {
        withCredentials: true //允许跨域带Cookie
    },
    success:function (admin) {
        if(admin.errorMsg!=null){
            alert(admin.errorMsg);
            location.href="login.html";
        }
        if(admin.status==false){
        location.href="login.html";
        alert("账户已停用");
        }
        else {
            adminInfo=admin;
        }
    },
    error:function (XMLHttpRequest, textStatus, errorThrown) {
        // 状态码
        console.log(XMLHttpRequest.status);
        // 状态
        console.log(XMLHttpRequest.readyState);
        // 错误信息
        console.log(textStatus);
    }
});