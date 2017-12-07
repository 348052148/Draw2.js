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


let app = new BApplication();
app.createWindow(0,0,800,800,'1px solid #000',document.body,60);

let director = new BDirector(app);

let scene = new BPhysicsScene([0,100]);

director.addScene(scene);

let bodySprite = new BPhysicsSprite(300,60);

bodySprite.setPosition([200,600]);

bodySprite.draw = function(contact){
    let paint = BPaint.from(contact.context);
    paint.setColor('#000');
    paint.strokeRect(this.x(), this.y(), this.width, this.height);
};

scene.addChild(bodySprite);
//
bodySprite.setBodyType(b2Body.b2_staticBody);
let shape = new b2PolygonShape;
shape.SetAsBox(bodySprite.width/bodySprite.pixelRate, bodySprite.height/bodySprite.pixelRate);
bodySprite.setBodyShape(shape);
//
// console.log(shape instanceof  Box2D.Collision.Shapes.b2PolygonShape);
//
// let box = new BBollMove(-1,2,[800,800]);
//
// // bodySprite.runAction(box);
//
//
// let cricleSprite = new BSprite(80,80);
//
// cricleSprite.draw = function(contact,context){
//     let paint = BPaint.from(context);
//     paint.setColor('#000');
//     // this.setPosition([this.b2Body.GetPosition().x*30,this.b2Body.GetPosition().y*30]);
//     context.beginPath();
//     context.arc(this.x(),this.y(),this.width/2,0,2*Math.PI);
//     context.stroke();
// };
//
// cricleSprite.setBodyType(Box2D.Dynamics.b2Body.b2_dynamicBody);
//
// cricleSprite.setBodyShape(new Box2D.Collision.Shapes.b2CircleShape());
//
// cricleSprite.setPosition([140,40]);
//
// cricleSprite.setScale(0.5,0.5);
//
// scene.addChild(cricleSprite);
//
//
// let cricleSprite1 = new BSprite(80,80);
//
// cricleSprite1.draw = function(contact,context){
//     let paint = BPaint.from(context);
//     paint.setColor('#000');
//     // this.setPosition([this.b2Body.GetPosition().x*30,this.b2Body.GetPosition().y*30]);
//     context.beginPath();
//     context.arc(this.x(),this.y(),this.width/2,0,2*Math.PI);
//     context.stroke();
// };
//
// cricleSprite1.setBodyType(Box2D.Dynamics.b2Body.b2_dynamicBody);
//
// cricleSprite1.setBodyShape(new Box2D.Collision.Shapes.b2CircleShape());
//
// cricleSprite1.setPosition([170,100]);
//
// cricleSprite1.setScale(0.5,0.5);
//
// scene.addChild(cricleSprite1);


let rectSprite = new BPhysicsSprite(100,100);
// rectSprite.draw=function () {
//
// }
rectSprite.setPosition([200,100]);
// rectSprite.setBodyType(Box2D.Dynamics.b2Body.b2_staticBody);
rectSprite.setBodyType(Box2D.Dynamics.b2Body.b2_dynamicBody);

rectSprite.setBodyShape(new Box2D.Collision.Shapes.b2PolygonShape());

// rectSprite.setRotate(1);
let brotate = new BRotate(0.1);

// rectSprite.runAction(brotate);

scene.addChild(rectSprite);

let rectSprite1 = new BPhysicsSprite(100,100);
rectSprite1.setPosition([0,100]);
rectSprite1.setBodyType(Box2D.Dynamics.b2Body.b2_staticBody);
// rectSprite.setBodyType(Box2D.Dynamics.b2Body.b2_dynamicBody);

rectSprite1.setBodyShape(new Box2D.Collision.Shapes.b2PolygonShape());

scene.addChild(rectSprite1);



director.run();


setInterval(function () {
    // rectSprite.setPosition([rectSprite.x(),rectSprite.y()+10]);
},1000/60);
