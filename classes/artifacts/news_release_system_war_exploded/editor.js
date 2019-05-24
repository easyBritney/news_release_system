
function save(){
    var state = "saved";
    var title=document.getElementById("atitle").value;
    var content=$('#content').summernote('code');
    // var content=document.getElementById("content").innerHTML;
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",//方法类型
        url: "http://localhost:10080/editor/save?state="+ state+"&title="+title,//url
        dataType: "json",//预期服务器返回的数据类型
        data: JSON.stringify(new result("succeed",content) ),
        contentType: "application/json",
        success: function (result,status,xhr) {
            console.log(result);
            if (result.status === "succeed") {
                alert("SUCCESS");
                var win = window;
                while(win != win.top){
                    win = win.top;
                }
                win.location.href = xhr.getResponseHeader("CONTEXTPATH");
            }
            else{
                alert("标题不能为空且文章内容不能为空");
            }
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    });
}

function result(status,content){
    this.status = status;
    this.content = content;

}



function upload(){
    var state = "published";
    var title=document.getElementById("atitle").value;
    var content=$('#content').summernote('code');
    // var content=document.getElementById("content").innerHTML;
    console.log(content);
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "POST",//方法类型
        url: "http://localhost:10080/editor/save?state="+ state+"&title="+title+"&content="+content,//url
        dataType: "json",//预期服务器返回的数据类型
        // data: $('#editormassage').serialize(),
        success: function (result,status,xhr) {
            console.log(result);
            if (result.status === "succeed") {
                alert("SUCCESS");
                var win = window;
                while(win != win.top){
                    win = win.top;
                }
                win.location.href = xhr.getResponseHeader("CONTEXTPATH");
            }
            else{
                alert("标题不能为空且文章内容不能为空");
            }
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    });
}

