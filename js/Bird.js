/**
 * Created by chaney on 2017/2/8.
 */
(function () {
    window.Bird = Class.extend({
        init:function () {
            this.x = game.canvas.width * 0.5;
            this.y = game.canvas.height * 0.3;
            this.width = 85;
            this.height = 60;

            //鸟的状态(根据翅膀状态)，合法值：0，1，2
            this.swingState = 0;
            //鸟煽动的频率
            this.swingRate = 5;

            //下落增量
            this.dY = 0;
            //下落的帧数
            this.drop = game.frameUtil.currentFrame;
            //小鸟旋转角度
            this.rotateAngle = 0;

            //鸟的方向状态，0：往下掉  1：往上飞
            this.state = 0 ;
            //空气阻力
            this.deltaY = 1;
            //监听鸟的点击
            this.birdClickListen();

            //鸟的死忙状态
            this.die = false;
            //鸟死忙动画的角标
            this.dieAnimationIndex = 0;
        },

        update:function () {
            if(this.die){
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex ==30){
                    game.pause(); //停止计时
                }
                return;
            }



            //鸟的煽动翅膀
            if(game.frameUtil.currentFrame % this.swingRate == 0){
                this.swingState++;
                if(this.swingState > 2){
                    this.swingState = 0;
                }
            }

            //判断鸟的状态
            if(this.state == 0){
                //自由落体
                //下落高度: h = 1/2 * g * Math.pow(t, 2)
                this.dY = 0.001 * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.drop, 2);
            }else if(this.state == 1){
                this.deltaY++;
                this.dY = -15 + this.deltaY;
                if(this.dY >= 0){
                    //更改状态
                    this.state = 0;
                    //更新下落帧数
                    this.drop = game.frameUtil.currentFrame;
                }
            }


            //更新y值
            this.y += this.dY;

            //封锁上空
            if(this.y < 0){
                this.y = 0;
            }
            //撞到地板
            if(this.y > game.canvas.height - 48 - this.height){
                game.gameOver();
            }

            //增加旋转角度
            this.rotateAngle += 1;
        },

        render:function () {
            //gameOver的抛洒热血
            if(this.die){
                //截取图片的宽和高
                var sWidth = 325, sHeight = 138;
                //计算行和列
                var row = parseInt(this.dieAnimationIndex / 5);
                var col = this.dieAnimationIndex % 5;
                //截图绘制
                game.context.drawImage(game.allImageObj['blood'],col * sWidth,row * sHeight,sWidth,sHeight,this.x - 100, this.y,sWidth,sHeight);
                game.context.drawImage(game.allImageObj['gameover'],(game.canvas.width - 626) * 0.5,(game.canvas.height - 144) * 0.5);

                return;
            }

            game.context.save();
            game.context.translate(this.x + this.width * 0.5, this.y + this.height *0.5);//讲当前画布原点位移到鸟的中心
            game.context.rotate(this.rotateAngle *Math.PI/180);
            game.context.translate(-(this.x + this.width * 0.5), -(this.y + this.height *0.5)); //还原
            game.context.drawImage(game.allImageObj['bird'],this.swingState * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.context.restore();
        },
        //监听点击方法
        birdClickListen:function () {
            var self = this;
            game.canvas.addEventListener('mousedown',function () {
                //更改状态
                self.state = 1;
                //旋转角度
                self.rotateAngle = -25;
                //阻力归位
                self.deltaY = 1
            })
        }
    })

})();