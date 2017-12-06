import BAction from './BAction.js'
class BBollMove extends BAction{
    constructor(lx,ly,pos){
        super();
        this.xflag=1;
        this.yflag=1;

        //预判
        if(lx < 0) this.xflag = 1; else this.xflag=0;

        if(ly <0) this.yflag = 1; else this.yflag =0;

        this.lx = lx;
        this.ly = ly;
        this.pos = pos;
    }

    executed(obj){

        if(obj.y() >= this.pos[1] - obj.height/2 ){
            this.yflag=1;
        }
        if(obj.x()>= this.pos[0] - obj.width/2 ){
            this.xflag=1;
        }

        if(obj.x()<=obj.width/2){
            this.xflag=0;
        }
        if(obj.y()<=obj.height/2){
            this.yflag=0;
        }
        if(this.xflag==0){
            // obj.setPos({x:obj.X()+Math.abs(lx),y:obj.Y()});
            obj.setPosition([obj.x()+Math.abs(this.lx),obj.y()]);
        }
        if(this.xflag==1){
            // obj.setPos({x:obj.X()-Math.abs(lx),y:obj.Y()});
            obj.setPosition([obj.x()-Math.abs(this.lx),obj.y()]);
        }
        if(this.yflag==0){
            // obj.setPos({x:obj.X(),y:obj.Y()+Math.abs(ly)});
            obj.setPosition([obj.x(),obj.y()+Math.abs(this.ly)]);
        }
        if(this.yflag==1){
            // obj.setPos({x:obj.x(),y:obj.y()-Math.abs(ly)});
            // obj.setPos({x:obj.X(),y:obj.Y()-Math.abs(ly)});
            obj.setPosition([obj.x(),obj.y()-Math.abs(this.ly)]);
        }
    }

}
export default BBollMove;