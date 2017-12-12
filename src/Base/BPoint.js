/**
 *  坐标点对象
 */
import BObject from './BObject.js'
class BPoint extends BObject{

    constructor(pos=[0,0]){
        super();
        //坐标
        this._x=pos[0];
        this._y=pos[1];
        this._old_x=null;
        this._old_y=null;
    }

    //设置基础坐标
    setPosition(pos){
        if(this._old_x==null) {
            this._old_x = pos[0];
        }else{
            this._old_x= this._x;
        }
        if(this._old_y==null){
            this._old_y= pos[1];
        }else{
            this._old_y= this.posY;
        }
        this._x = pos[0];
        this._y = pos[1];
    };

    //实际坐标X
    x(){
        return  this._x;
    };
    //实际坐标Y
    y(){
        return  this._y;
    };
}
export default BPoint;