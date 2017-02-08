/**
 * Created by chaney on 2017/2/8.
 */
//加载图片资源工具类
(function () {
    window.StaticSourceUtil = Class.extend({
        init: function () {
            this.allImageObj = {};
        },

        //加载图片方法, 返回 所有dom对象, 总的图片个数, 已经加载的图片个数
        loadImage: function (jsonUrl, callBack) {
            //1.备份指针
            var self = this;

            //2.创建请求对象
            if (XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else {
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            //3.连接
            xhr.open("get", jsonUrl);
            //4.发送
            xhr.send(null);
            //5.接收
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        //成功
                        //加载图片个数
                        var loadImageCount = 0;
                        //5.1请求数据
                        var responseText = xhr.responseText;
                        //5.2解析json
                        var responseJson = JSON.parse(responseText);
                        //5.2数组
                        var imageArr = responseJson.images;
                        //5.3遍历数组
                        for(var i =0; i < imageArr.length; i++){


                            //创建image对象
                            var image = new Image();
                            image.src = imageArr[i].src;
                            image.index = i;
                            image.onload = function () {
                                //累加图片个数
                                loadImageCount++;
                                //保存image对象
                                self.allImageObj[imageArr[this.index].name] = this;
                                //回调
                                callBack(self.allImageObj,imageArr.length,loadImageCount);
                            }
                        }
                    } else {
                        //失败
                        alert("失败");
                    }
                }
            }

        }
    })


})();