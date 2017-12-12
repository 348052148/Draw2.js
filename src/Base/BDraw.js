// draw 对象 提供动作相关列表和操作
import BContainer from './BContainer.js'
class BDraw extends BContainer{

    constructor(){
        super();
        //是否活跃
        this.isActive = true;


        this.acObj= new Array();
        this.isActionActive  = true;
        this.nodeType = 0; // 0 静态节点 1 动态节点
    }

    beferDraw(){

    }

    draw(){

    }

    lastDraw(){

    }

    setActive(flag){
        this.isActive = flag;
    }


    actions(contact,context){
        if(!this.isActionActive) return false;
        if(this.acObj!=undefined && this.acObj!=null){
            for(let ac in this.acObj){
                let acobj = this.acObj[ac];
                if(acobj.isActive){
                    acobj.executed(this,context);
                }
            }
        }

    };

    runAction(action){
        if(!this.acObj[action.UUID]){

            this.acObj[action.UUID] = action;
        }
        action.isActive = true;
        this.nodeType = 1;

    };

    stopAction (action) {
        action.isActive = false;
        if(this.acObj.length==0){
            this.nodeType = 0;
        }
    };

    removeALLAction(){
        this.acObj = [];
        this.nodeType = 0;
    };

    //移除
    removeAction(action) {

    };

    stopALLAction(){
        this.isActionActive = false;
    }

}

export default BDraw;