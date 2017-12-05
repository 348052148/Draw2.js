import BAction from './BAction.js'
class BRotate extends BAction{

    constructor(speed){
        super();
        this.speed = speed;
    }
    executed(obj){
        obj.setRotate(obj.angle+this.speed);
        if(obj.angle==1) obj.angle = 0;

    }
}
export default BRotate;