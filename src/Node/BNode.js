//融合volume
import BContainer from '../Base/BContainer.js'
import BActions from '../Base/BActions.js'
import BPoint from '../Base/BPoint.js'
import BEvent from '../Events/BEvent.js'
class BNode extends BContainer{

    constructor(){
        super();

        this.width = 0;

        this.height = 0;

        this.matrix = [];

        this.position = new BPoint();

        this.scaleX = 1;

        this.scaleY = 1;

        this.angle = 0;
        //中心点
        this.corePos = new BPoint();
        //基础坐标
        this.basePos = new BPoint();

        this.event = new BEvent();
    }

    //todo 事件
    addEventListener(event,callback){
        this.event.addEventListener(event,callback,this);
    }
    setMouseIn(flag){
        this.event.isMouseIn = flag;
    }
    isMouseIn(){
        return this.event.isMouseIn;
    }
    setFoucs(flag){
        this.event.foucs = flag;
    }
    isFoucs(){
        return this.event.foucs;
    }
    //todo 处理层级绘画
    topDraw(contact){
        for(var i=0;i<this.nodeList.length;i++){

            if(this.nodeList[i] == null || this.nodeList[i] == undefined){
                continue;
            }

            //如果是活跃节点
            if(this.nodeList[i].node.isActive){
                contact.context.save();

                //处理scale

                // new BActions(context).scale(this.nodeList[i].node.scaleX,this.nodeList[i].node.scaleY);
                new BActions(contact.context).rotate(this.nodeList[i].node.getAngle(),this.nodeList[i].node.corePos);

                contact.pWidth = this.width;
                contact.pHeight = this.height;
                //todo 上下文对象
                this.nodeList[i].node.context = contact.context;
                this.nodeList[i].node.beferDraw(contact);
                this.nodeList[i].node.draw(contact,contact.context);
                this.nodeList[i].node.lastDraw(contact);

                contact.context.restore();
            }

            //执行自己节点拥有的动作
            if(this.nodeList[i].node.actions!=undefined && this.nodeList[i].node.actions!=null){
                this.nodeList[i].node.actions(contact);
            }

            //判断是否为非point属性 设置基础属性
            if(this.x != undefined){
                this.nodeList[i].node.setBasePosition({x:this.x(),y:this.y()});
            }
        }
    }

    //宽度
    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    //----Position--
    x(){
        return this.position.x();
    }

    y(){
        return this.position.y();
    }

    setBasePosition(pos){
        this.basePos.setPosition([pos.x,pos.y]);
    }

    setPosition(pos){
        this.position.setPosition(pos);
        this._setCospos();
        // this._setWorldPos();
    }

    //获取矩阵
    getMatrix(){
        return [
            [this.x()-this.width/2,this.y()-this.height/2],
            [this.x()+this.width/2,this.y()-this.height/2],
            [this.x()+this.width/2,this.y()+this.height/2],
            [this.x()-this.width/2,this.y()+this.height/2]
        ];
    }

    getAngle(){
        return this.angle;
    }


    //-------------Scale------------

    setScale(scaleX,scaleY){
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.width = this.width*this.scaleX;
        this.height = this.height*this.scaleY;
        this._setCospos();
        // this._setWorldPos();
    }

    setRotate(angle){
        this.angle = angle;
    }

    //模拟 scale 操作
    _setCospos(){
        this.corePos = {x:this.x(),y:this.y()};
    }

}
export default BNode;