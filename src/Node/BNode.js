//融合volume
import BContainer from '../Base/BContainer.js'
import BActions from '../Base/BActions.js'
import BPoint from '../Base/BPoint.js'
import Box2D from 'box2dweb'
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
        //中心点

        this.box2dPos = new BPoint();
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
        if(this.b2Body != null){
            return this.b2Body.GetPosition().x*30;
        }
        return this.position.x();
    }

    y(){
        if(this.b2Body != null){
            return this.b2Body.GetPosition().y*30;
        }
        return this.position.y();
    }

    setBasePosition(pos){
        this.basePos.setPosition([pos.x,pos.y]);
    }

    setPosition(pos){
        this._setBox2DPos(pos[0],pos[1]);
        this.position.setPosition(pos);
        this._setCospos();
        // this._setWorldPos();
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
        // this._setWorldPos();
    }

    setRotate(angle){
        this.angle = angle;
    }

    //模拟 scale 操作
    _setCospos(){
        this.corePos = {x:this.x()+(this.width)/2,y:this.y()+(this.height)/2};
    }

    //todo 改变本地坐标相当于改变box2的坐标 顺便设置本地坐标
    _setBox2DPos(x,y){
        if(this.b2Body != null){
            this.b2Body.SetPosition(new Box2D.Common.Math.b2Vec2(x/30,y/30));
        }
    }

    //todo world 由 本地系统坐标改变映射到box2d
    _setWorldPos(){
        if(this.b2Body != null){
            // this.b2Body.position.x = (this.x()+this.width/2)/30;    //X轴 * 60
            // this.b2Body.position.y = (this.y()+this.height/2)/30;    //Y轴 * 30
            this.b2Body.SetPosition(new Box2D.Common.Math.b2Vec2((this.x()+this.width/2)/30,(this.y()+this.height/2)/30));
        }
    }


}
export default BNode;