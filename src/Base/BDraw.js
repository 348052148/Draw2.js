//融合之前老的
import BObject from './BObject.js'
class BDraw extends BObject{

    constructor(){
        super();
        //是否活跃
        this.isActive = true;


        this.acObj= new Array();
        this.isActionActive  = true;
    }

    draw(){

    }


    actions(contact){
        if(!this.isActionActive) return false;
        if(this.acObj!=undefined && this.acObj!=null){
            for(let ac in this.acObj){
                let acobj = this.acObj[ac];
                if(acobj.isActive){
                    acobj.executed(this,contact.context);
                }
            }
        }

    };

    runAction(action){
        if(!this.acObj[action.UUID]){

            this.acObj[action.UUID] = action;
        }
        action.isActive = true;

    };

    stopAction (action) {
        action.isActive = false;
    };

    removeALLAction(){
        this.acObj = [];
    };

    //移除
    removeAction(action) {

    };

    stopALLAction(){
        this.isActionActive = false;
    }

}

export default BDraw;