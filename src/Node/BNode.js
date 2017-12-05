//融合volume
import BContainer from '../Base/BContainer.js'
import BPoint from '../Base/BPoint.js'
import BActions from '../Base/BActions.js'
import BPoint from '../Base/BPoint.js'
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
    }

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
                new BActions(contact.context).rotate(this.nodeList[i].node.angle,this.nodeList[i].node.corePos);

                contact.pWidth = this.width;
                contact.pHeight = this.height;
                this.nodeList[i].node.draw(contact);

                contact.context.restore();
            }

            if(this.nodeList[i].node.actions!=undefined && this.nodeList[i].node.actions!=null){
                this.nodeList[i].node.actions();
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
    }

    //获取矩阵
    getMatrix(){
        return [[this.x(),this.y()],[this.x()+this.width,this.y()],[this.x()+this.width,this.y()+this.height],[this.x(),this.y()+this.width]];
    }


    //-------------Scale------------

    setScale(scaleX,scaleY){
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.width = this.width*this.scaleX;
        this.height = this.height*this.scaleY;
        this._setCospos();
    }

    setRotate(angle){
        this.angle = angle;
    }

    //模拟 scale 操作
    _setCospos(){
        this.corePos = {x:this.x()+(this.width)/2,y:this.y()+(this.height)/2};
    }


}
export default BNode;