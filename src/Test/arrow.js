import BDirector from './Director/BDirector.js'
import BApplication from './BApplication.js'
import BScene from './Scene/BScene.js'
import BPhysicsScene from './Scene/BPhysicsScene.js'
import BSprite from './Sprite/BSprite.js'
import BPhysicsSprite from './Sprite/BPhysicsSprite.js'
import BMoveTo from './Actions/BMoveTo.js'
import BRotate from './Actions/BRotate.js'
import BTrajectory from './Actions/BTrajectory.js'
import BBollMove from './Actions/BBollMove.js'
import BTextSprite from './Sprite/BTextSprite.js'
import BPaint from './Base/BPaint.js'
import BProgressBar from './UI/BProgressBar.js'
import BExplorer from './UI/BExplorer.js'
import BImageSprite from './Sprite/BImageSprite.js'
import BAnimate from './Actions/BAnimate.js'
import BFilterPiex from "./Actions/BFilterPiex.js";
import forward from './Assets/image/forward.png'
import filterJpg from './Assets/image/filter.jpg'
import arrow from './Assets/image/arrow.png';

import Box2D from 'box2dweb'


var  b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


let scene = new BPhysicsScene([0,9.8]);
scene.width = 800;
scene.height = 800;
scene.setPosition([400,400]);
scene.setDebug(false);

console.log(scene.getMatrix());

director.addScene(scene);

let bodySprite = new BPhysicsSprite(800,30);

bodySprite.setPosition([400,600]);

bodySprite.draw = function(contact){
    let paint = BPaint.from(contact.context);
    paint.setColor('#000');
    paint.strokeRect(this.x(), this.y(), this.width, this.height);
};

scene.addChild(bodySprite);
//
bodySprite.setBodyType(b2Body.b2_staticBody);
let shape = new b2PolygonShape;
bodySprite.setBodyShape(shape);


let arrowList= [];

for(let i =0;i<10;i++){
    let rectSprite = new BPhysicsSprite(150,25);

    rectSprite.draw=function(conntact,context){
        this.setWidth(explorer.IMG['arrow'].width);
        this.setHeight( explorer.IMG['arrow'].height);
        BPaint.from(context).drawImage(explorer.IMG['arrow'],this.x(),this.y(),this.width,this.height);
    };

    rectSprite.setPosition([0,0]);
    rectSprite.setBodyType(Box2D.Dynamics.b2Body.b2_staticBody);
    rectSprite.setBodyShape(new Box2D.Collision.Shapes.b2PolygonShape());

    scene.addChild(rectSprite);

    arrowList.push(rectSprite);

}
let isS = false;
let v = 1;
scene.addEventListener('mousemove',function (e) {
    if(!isS){

        arrowList.forEach(function (val) {
            let p1 = [val.x(),val.y()];
            let p2 = [e.offsetX,e.offsetY];
            let b1 = p2[0] - p1[0];
            let b2 = p2[1] - p1[1];
            let b3 = Math.sqrt(b1*b1+b2*b2);

            let r = 2*Math.PI+Math.asin(b2/b3);

            v = b2/b1;
            val.setRotate(r);
        })

    }

});

scene.addEventListener('mousedown',function (e) {
    if(arrowList.length > 0){
        let arrowObj = arrowList.shift();
        arrowObj.setBodyType(Box2D.Dynamics.b2Body.b2_dynamicBody);
        arrowObj.applyImpulse([50,50*v]);
    }
});