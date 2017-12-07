import BNode from '../Node/BNode.js'
import Box2D from 'box2dweb'
class BPhysicsScene extends BNode{

    constructor(vector=[0,9.8],doSleep=false){
        super();
        this.b2World = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(vector[0],vector[1]),doSleep);

        //todo 设置调试模式
        this.debugDraw = new Box2D.Dynamics.b2DebugDraw();
        this.b2World.SetDebugDraw(this.debugDraw);
    }

    draw(contact){

        this.setdebugDraw(contact.context);

        this.b2World.Step(
            1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
        );
        this.b2World.DrawDebugData();
        this.b2World.ClearForces();
    }

    setdebugDraw(context){
        this.debugDraw.SetSprite(context);
        this.debugDraw.SetDrawScale(30.0);
        this.debugDraw.SetFillAlpha(0.3);
        this.debugDraw.SetLineThickness(1.0);
        this.debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
    }


}

export default BPhysicsScene;