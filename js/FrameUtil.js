/**
 * Created by chaney on 2017/2/6.
 */
(function () {
    window.FrameUtil = Class.extend({
        init:function () {
            //1.总帧数
            this.currentFrame = 0;
            //2.开始的时间
            this.sTime = new Date();
            //3.开始的帧数
            this.sFrame = 0;
            //4.真实的fps
            this.realFps = 0;
        },

        //每一帧都执行
        render:function () {
            //累加总帧数
            this.currentFrame++;
            //获取当前帧数的时间
            var currentTime = new Date();
            //判断
            if(currentTime - this.sTime >= 1000){//判断是否达到1s
                //计算真实帧数
                this.realFps = this.currentFrame -this.sFrame;

                //更新
                this.sTime = currentTime;
                this.sFrame = this.currentFrame;

            }
        }
    })
})();