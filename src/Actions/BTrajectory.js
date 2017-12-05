import BAction from './BAction.js'
class BTrajectory extends BAction{
    constructor(){
        super();
        this.posLst = new Array();
    }
    join(x,y,speed){
        this.posLst.push({
            x:x,
            y:y,
            speed:speed,
            flag:false
        });
        return this;
    }
    executed(obj){
        var pos = {};
        var failLen = 0;
        for(var i=0;i<this.posLst.length;i++){
            if(!this.posLst[i].flag){
                pos = this.posLst[i];
                var xSpeed = (pos.x-obj.x()>0)?pos.speed:-pos.speed;
                var ySpeed = (pos.y-obj.y()>0)?pos.speed:-pos.speed;
                if(obj.x()>=pos.x-pos.speed && obj.x()<=pos.x+pos.speed){
                    xSpeed = 0;
                }
                if(obj.y()>=pos.y-pos.speed && obj.y() <= pos.y+pos.speed){
                    ySpeed = 0;
                }
                if(xSpeed ==0 && ySpeed == 0) this.posLst[i].flag = true;

                obj.setPosition([obj.x()+xSpeed,obj.y()+ySpeed]);

                break;
            }else {
                ++failLen;
            }
        }
        console.log(failLen);
        if(failLen == this.posLst.length){ console.log('finiash'); this.isActive = false;}
        //
    }
}

export default BTrajectory;