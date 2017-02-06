/**
 * Created by chaney on 2017/2/6.
 */
//中介者类
(function () {
    window.Game = Class.extend({
        init: function (option) {
            option = option || {};
            //1.fps
            this.fps = option.fps || 50;

            //2.实例化帧工具类
            this.frameUtil = new FrameUtil();

            //3.获取上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');
        },

        //游戏运行
        run: function () {
            //备份指针
            var self = this;
            setInterval(function () {
                self.runloop();
            }, 1000 / this.fps);//每一帧所用时间
        },

        //游戏循环
        runloop: function () {
            // console.log(Math.random());
            //执行帧工具类方法
            this.frameUtil.render();

            //清
            this.context.clearRect(0, 0, this. canvas.width, this.canvas.height);

            //绘制文本
            this.context.fillText('FPS / ' + this.frameUtil.realFps, 15, 15);
            this.context.fillText('FNO / ' + this.frameUtil.currentFrame, 15, 30);

        },


        //游戏停止
        pause: function () {
            clearInterval(this.timer);
        },

        //游戏结束
        gameOver: function () {

        }
    })
})();