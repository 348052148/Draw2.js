import BUtils from '../Tools/BUtils.js'
class BDirector {

    constructor(){
        this.game;
        this.sceneList=new Array();
        this.runScene=null;
        this.isRun = false;
    }

    addScene(scene){
        this.sceneList.push({scene:scene,sceneId:BUtils.uuid()});
        console.log(this.sceneList);
        if(this.runScene==null){
            this.runScene=this.sceneList[0].scene;
        }
    };

    popScene(){
        return this.sceneList.pop();
    };

    switchScene(scene){
        this.runScene=scene;
        this.flushScene();
    };

    switchSceneAdd(scene){
        this.runScene=scene;
        this.addScene(scene);
        this.flushScene();
    };

    switchSceneId(sceneId){
        for(var i=0;i<this.sceneList.length;i++){
            if(this.sceneList[i].sceneId==sceneId){
                this.runScene=this.sceneList[i].scene;
                this.flushScene();
                break;
            }
        }
    };

    init(application){
        this.application=application;
    };

    run(){
        var scene=this.runScene;
        //兼容
        if(!window.requestAnimationFrame){
            var lastTime = 0;
            window.requestAnimationFrame = function(callback){
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0,16.7-(currTime - lastTime));
                var id  = window.setTimeout(function(){
                    callback(currTime + timeToCall);
                },timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            }
        }
        if(!this.isRun){
            BFrame.scene = scene;
            BFrame.application  = this.application;
            BFrame();
            this.isRun = true;
        }

        // this.flushId=setInterval(()=>{
        //     //todo 状态保存
        //     this.application.BContext.save();
        //     scene.draw({context:this.application.BContext,pWidth:this.application.width,pHeight:this.application.height});
        //     //todo 状态恢复
        //     this.application.BContext.restore();
        // },this.application.fps);
    };

    stop(){
        // clearInterval(this.flushId);

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        cancelAnimationFrame(BFrame.frameID)
        this.isRun = false;
    };

    flushScene(){
        this.stop();
        this.run();
    };
}

function BFrame(time) {
    BFrame.application.fps = 1000/(time-BFrame.preTime);
    BFrame.preTime = time;
    //todo 状态保存
    BFrame.application.BContext.save();
    BFrame.scene.draw({context:BFrame.application.BContext,pWidth:BFrame.application.width,pHeight:BFrame.application.height});
    //todo 状态恢复
    BFrame.application.BContext.restore();

    BFrame.frameID = window.requestAnimationFrame(BFrame);
}

export default BDirector;