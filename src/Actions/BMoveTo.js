import BAction from './BAction.js'
class BMoveTo extends BAction{

    constructor(mx,my,speed){
        super();
        this.mx = mx;
        this.my = my;
        this.speed = speed;
    }

    executed(obj){
        let xSpeed = (this.mx > obj.x())?this.speed:-this.speed;
        let ySpeed = (this.my > obj.y())?this.speed:-this.speed;
        //证明已到
        if(obj.x()>=this.mx-this.speed && obj.x() <= this.mx + this.speed){
            xSpeed = 0;
        }
        if(obj.y()>=this.my - this.speed && obj.y() <= this.my + this.speed){
            ySpeed = 0;
        }

        if(xSpeed == 0 && ySpeed ==0){ 
            this.isActive = false;
            obj.setPosition([this.mx,this.my]);
        }

        obj.setPosition([obj.x()+xSpeed,obj.y()+ySpeed]);
    };

}

export default BMoveTo;