var file;

window.onload =  function(){
    $.ajax({
        type: "GET",//方法类型
        url: "http://localhost:10080/columns" ,//url
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",//预期服务器返回
        success: function (result,status,xhr) {
            console.log(result);
            app.columns=result;
        },
        error : function(e) {
            console.log(e);
            alert("异常！");
        }
    })

    document.querySelector("#uploadfile").addEventListener("change",function (event) {
        console.log(event);
        file = event.target.files[0];
        console.log(file.name);

        if(document.querySelector("#uploadpicture")==null)
        {
            var upbtn = document.createElement("button");
            upbtn.type = "button";
            upbtn.tabIndex = "500";
            upbtn.id = "uploadpicture";
            upbtn.className = "btn btn-default btn-secondary fileinput-upload fileinput-upload-button";
            var logo = document.createElement("i");
            logo.className="glyphicon glyphicon-upload";
            var txt = document.createElement("span");
            txt.className="hidden-xs";
            txt.textContent = "提交";
            upbtn.appendChild(logo);
            upbtn.appendChild(txt);
            upbtn.addEventListener("click",function (event) {
                event.preventDefault();

                var formData = new FormData();
                formData.append("file", file);
                console.log(formData);

                $.ajax({
                    type: "POST",//方法类型
                    url: 'http://localhost:10080/editor/uploadpicture' ,//url
                    xhrFields: {
                        withCredentials: true
                    },
                    processData : false,
                    data: formData,
                    contentType: false,
                    success: function (result,status,xhr) {
                        console.log(result);
                    },
                    error : function(e) {
                        console.log(e);
                        alert("异常！");
                    }
                })
            });
            $(".file-input")[0].appendChild(upbtn);
        }



    })


};

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
        url: "http://localhost:10080/editor/save/"+app.cid+"/?state="+ state+"&title="+title,//url
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
        type: "POST",
        url: "http://localhost:10080/editor/save?state="+ state+"&title="+title+"&content="+content+"&filename="+file.name,//url
        dataType: "json",//预期服务器返回的数据类型
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

var app = new Vue({
    el:"#page-wrapper",
    data:{
        columns:[],
        cid:''
    },
    methods:{
        getColumnSelected:function(){
           
            console.log(this.cid) ;
        }
    }
})
