/**
 * Created by chaney on 2017/2/8.
 */
//管道工具类
(function () {
    window.Pipe = Class.extend({
        init: function () {
            //规定管道口方向 0：向下， 1：向上
            this.dir = _.random(0, 1);
            this.width = 148;
            this.height = _.random(80, game.canvas.height * 0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - this.height - 48;

            //速度
            this.speed = 4;
        },

        //更新
        update: function () {
            this.x -= this.speed;
            //判断是否超出画面，优化处理
            /*if(this.x < -this.width){

             }*/
            
            //鸟和管道的碰撞检查
            if((game.bird.x < this.x + this.width) && (game.bird.x > this.x -game.bird.width)){//X方向碰撞检查
                //根据口的方向判断y方向碰撞
                if(this.dir == 0){
                    if(game.bird.y < this.height){
                        game.gameOver();
                    }
                }else if(this.dir == 1){
                    if(game.bird.y + game.bird.height> this.y){
                        game.gameOver();
                    }
                }

            }
        },

        //绘制
        render: function () {
            //判断管道口的方向
            if (this.dir == 0) {
                game.context.drawImage(game.allImageObj['pipe1'], 0, 1664 - this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            } else if (this.dir == 1) {
                game.context.drawImage(game.allImageObj['pipe0'], 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
            }

        },

        //停止
        pause: function () {
            this.speed = 0;
        }


    })
})();