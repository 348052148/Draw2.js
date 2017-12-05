
class BPoint{

    constructor(){
        //坐标
        this._x=0;
        this._y=0;
        this._old_x=99999;
        this._old_y=99999;
    }

    //设置基础坐标
    setPosition(pos){
        if(this._old_x==99999) {
            this._old_x = pos.x;
        }else{
            this._old_x= this._x;
        }
        if(this._old_y==99999){
            this._old_y= pos.y;
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