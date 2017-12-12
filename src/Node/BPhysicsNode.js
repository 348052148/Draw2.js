/**
 * 物理绘画节点
 */
import BNode from './BNode.js'
import BPoint from '../Base/BPoint.js'
import Box2D from 'box2dweb'
class BPhysicsNode extends BNode{
    constructor(){
        super();
        this.b2Body = null;
        //材质
        this.fixDef = new Box2D.Dynamics.b2FixtureDef;

        //异步执行队列
        this.cmdQueue = [];

        this.bodyDef = new Box2D.Dynamics.b2BodyDef;


        this.box2dPos = new BPoint();

        //todo box2d 坐标比例
        this.posRate = 30;
        //todo box2d 像素比例
        this.pixelRate = 60;
    }

    //todo 改变本地坐标相当于改变box2的坐标 顺便设置本地坐标
    _setBox2DPos(x,y){
        if(this.b2Body != null){
            this.b2Body.SetPosition(new Box2D.Common.Math.b2Vec2(x/this.posRate,y/this.posRate));
        }
    }

    //todo world 由 本地系统坐标改变映射到box2d
    _setWorldPos(){
        if(this.b2Body != null){
            // this.b2Body.position.x = (this.x()+this.width/2)/30;    //X轴 * 60
            // this.b2Body.position.y = (this.y()+this.height/2)/30;    //Y轴 * 30
            this.b2Body.SetPosition(new Box2D.Common.Math.b2Vec2((this.x()+this.width/2)/this.posRate,(this.y()+this.height/2)/this.posRate));
        }
    }

    //todo 懒加载模式创建b2Body
    _createBody(){
        if(this.b2Body==null){
            this.fixDef.density = 1.0; //密度
            this.fixDef.friction = 0.5; //摩擦
            this.fixDef.restitution = 0.2; //弹性

            this.bodyDef.position.x = this.x()/this.posRate;
            this.bodyDef.position.y = this.y()/this.posRate;

            this.b2Body = this.parentNode.b2World.CreateBody(this.bodyDef);
            this.b2Body.CreateFixture(this.fixDef);
        }
    }

    //todo 重新设置大小
    _setPixel(){
        if(this.fixDef.shape instanceof  Box2D.Collision.Shapes.b2PolygonShape){
            this.fixDef.shape.SetAsBox(this.width/this.pixelRate, this.height/this.pixelRate);
        }
        if(this.fixDef.shape instanceof  Box2D.Collision.Shapes.b2CircleShape){
            this.fixDef.shape.SetRadius(this.width/this.pixelRate);
        }
    }

    applyForce(vector){
        this.cmdQueue.push(
            ()=> {
                this.b2Body.ApplyForce(new Box2D.Common.Math.b2Vec2(vector[0],vector[1]),this.b2Body.GetWorldCenter());
            }
        );
    }

    applyImpulse(vector){
        this.cmdQueue.push(
            ()=> {
                this.b2Body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(vector[0], vector[1]), this.b2Body.GetWorldCenter());
            }
        );
    }

    applyTorque(torque){
        this.cmdQueue.push(
            ()=> {
                this.b2Body.ApplyTorque(torque);
            }
        );
    }

    //直接设置刚体的速度 会覆盖掉原有速度
    setLinearVelocity(vector){
        this.cmdQueue.push(
            ()=> {
                this.b2Body.setLinearVelocity(new Box2D.Common.Math.b2Vec2(vector[0], vector[1]));
            }
        );
    }


    setBodyType(type){
        this.bodyDef.type = type;
        this.cmdQueue.push(
            ()=> {
                this.b2Body.SetType(type);
            }
        );

    }

    setBodyShape(shape){
        this.fixDef.shape = shape;//new  Box2D.Collision.Shapes.b2CircleShape(this.width/60);
        // this.setSetRadius(this.width/60);
        this._setPixel();
    }

    beferDraw(contact){
        this._createBody();
    }

    lastDraw(contact){
        if(this.cmdQueue.length > 0){
            let cmd = this.cmdQueue.shift();
            cmd();
        }
    }

    setPosition(pos){
        this._setBox2DPos(pos[0],pos[1]);
        this.position.setPosition(pos);
        this._setCospos();
        // this._setWorldPos();
    }

    setWidth(width){
        this.width = width;
        this._setCospos();
        this._setPixel();
    }

    setHeight(height){
        this.height = height;
        this._setCospos();
        this._setPixel();
    }

    //----Position--
    x(){
        if(this.b2Body != null){
            // console.log(this.b2Body.GetWorldCenter());
            // this.setPosition([this.b2Body.GetPosition().x*this.posRate,this.b2Body.GetPosition().y*this.posRate]);
            this.position._x = this.b2Body.GetPosition().x*this.posRate;
            // this._setCospos();
            this.corePos = {x:this.position._x+this.width/2,y:this.position._y+this.height/2};
            return this.b2Body.GetPosition().x*this.posRate;
        }
        return this.position.x();
    }

    y(){
        if(this.b2Body != null){
            // this.setPosition([this.b2Body.GetPosition().x*this.posRate,this.b2Body.GetPosition().y*this.posRate]);
            this.position._y = this.b2Body.GetPosition().y*this.posRate;
            // this._setCospos();
            this.corePos = {x:this.position._x,y:this.position._y};
            return this.b2Body.GetPosition().y*this.posRate;
        }
        return this.position.y();
    }

    getAngle(){
        if(this.b2Body != null){
            this.angle = this.b2Body.GetAngle();
        }
        return this.angle;
    }

    setScale(scaleX,scaleY){
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.width = this.width*this.scaleX;
        this.height = this.height*this.scaleY;
        this._setCospos();
        this._setPixel();

    }

    setRotate(angle){
        this.angle = angle;
        this.bodyDef.angle = angle;
        if(this.b2Body != null){
            console.log('231');
            this.b2Body.SetAngle(angle);
        }
    }

}
export default BPhysicsNode;