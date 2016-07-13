/**
 * Created by iii-user on 2016/7/7.
 */
    var x_1;
    var y_1;
    var flight;
var play = cc.Layer.extend({
    fbullet:null,
    enemyGroup:[],
    bullet:[],
    ctor:function () {
        this._super();
        this.fbullet=[];
        this.enemyGroup=[];
        flight= new bf();
        //取得flight的x,y座標
        flight.x = flight.getPositionX();
        flight.y = flight.getPositionY();
        
        x_1 = flight.getPositionX();
        y_1 = flight.getPositionY();
        this.addChild(bg_2_Sprite);
        //當下this是在play內,所以this是指play
        var e= new enemy(this);
        this.addChild(flight);
        this.addChild(e);


        this.listen();

        //不斷更新update資料,
        this.schedule(this.update, 0, 16 * 1024, 1);
        return true;
    },

    listen:function () {

        if (cc.sys.capabilities.hasOwnProperty('mouse')) {
            // ({}) 內等於物件  (){} 是方法
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    if (event.getButton() == cc.EventMouse.BUTTON_LEFT) {
                        //用target才能抓到外部物件getCurrentTarget
                        var target = event.getCurrentTarget();
                        //速度等於長度除以時間，所以要有兩個座標，和速度 給兩個求出另一個
                        x_1 = event.getLocationX();
                        y_1 = event.getLocationY();
                        //給予座標初始值
                        var x_2 = flight.x;
                        var y_2 = flight.y;
                        //抵達座標
                        var speed = 190;
                        //設定速度10
                        var length_unsqrt = (x_2-x_1)*(x_2-x_1)+(y_2-y_1)*(y_2-y_1);
                        //長度平方乘以寬度平方
                        var length = Math.sqrt(length_unsqrt);
                        cc.log("length "+length);
                        //再開根號等於距離
                        var time = length/speed;
                        //時間出來溜

                        //清除上一個移動位置
                        flight.stopAllActions();
                        console.log("time"+" " + time);
                        var sp_action = cc.moveTo(time, cc.p(event.getLocationX(),event.getLocationY()));
                        cc.log("mouseX "+event.getLocationX());
                        //制定距離抓取



                        

                        // cc.log("ea:"+ea);

                        flight.runAction(sp_action);

                        var bullet = new cc.Sprite(res.Bullet1_png);
                        bullet.x=flight.x;
                        bullet.y=flight.y+20;
                        //已經裝進子彈到this.fbullet內了
                        target.fbullet.push(bullet);


                        var bullet_action = cc.MoveTo.create(1, cc.p(flight.x, 1000));
                        bullet.runAction(bullet_action);
                        target.addChild(bullet);
                       // target.flight.stopAllActions();

                    }
                }
            }, this);
        }
    },
    update:function() {
        flight.x = flight.getPositionX();
        flight.y = flight.getPositionY();
        //已經裝進子彈到this.fbullet內了



        var i ;
        var j ;
        for(i in this.fbullet){

            var bulleta = this.fbullet[i];
            var hBox = bulleta.getBoundingBox();//雷電子彈框
            for(j in EnemySprites){

                var enemy = EnemySprites[j];
                var eBox = enemy.getBoundingBox();//敵人飛機框
                if (cc.rectIntersectsRect(hBox, eBox)) {//判斷子彈與敵人是否發生碰撞
                    console.log("in__");
                    this.fbullet.splice(i, 1);//從子彈數組中刪除子彈
                    EnemySprites.splice(j, 1);
                    bulleta.removeFromParent(true);
                    enemy.removeFromParent(true);
                }
            }
        }
    }

});
var playScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new play();
        this.addChild(layer);
    }
});