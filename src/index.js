import BDirector from './Director/BDirector.js'
import BApplication from './BApplication.js'
import BScene from './Scene/BScene.js'
import BSprite from './Sprite/BSprite.js'
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


let director = new BDirector();


let win = new BApplication();
win.createWindow(0,0,800,800,'1px solid #000',document.body,60);
win.init();
win.world = new b2World(new b2Vec2(0,9.8),false);


let scene = new BScene(800,800);

director.addScene(scene);

let bodySprite = new BSprite(300,60);

bodySprite.setPosition([100,300-30]);

bodySprite.draw = function(contact){
    let paint = BPaint.from(contact.context);
    paint.setColor('#000');
    paint.fillRect(this.x(), this.y(), this.width, this.height);
};

console.log(win.world);

scene.addChild(bodySprite);


bodySprite.bodyDef =  new b2BodyDef;
bodySprite.bodyDef.type = b2Body.b2_staticBody;//静态的
bodySprite.bodyDef.position.x = (bodySprite.x())/30;    //X轴 * 60
bodySprite.bodyDef.position.y = (bodySprite.y())/30;    //Y轴 * 30

bodySprite.fixDef = new b2FixtureDef;
bodySprite.fixDef.density = 1.0;//密度
bodySprite.fixDef.friction = 0.5;//摩擦
bodySprite.fixDef.restitution = 0.2;//弹性
bodySprite.fixDef.shape = new b2PolygonShape;//矩形
bodySprite.fixDef.shape.SetAsBox(bodySprite.width/60, bodySprite.height/60);//宽高 * 60px


bodySprite.b2Body = win.world.CreateBody(bodySprite.bodyDef);
bodySprite.b2Body.CreateFixture(bodySprite.fixDef);

let box = new BBollMove(-1,2,[800,800]);

bodySprite.runAction(box);


let cricleSprite = new BSprite(80,80);

cricleSprite.draw = function(contact){
    let paint = BPaint.from(contact.context);
    paint.setColor('#000');
    // this.setPosition([this.b2Body.GetPosition().x*30,this.b2Body.GetPosition().y*30]);
    contact.context.beginPath();
    contact.context.arc(this.b2Body.GetPosition().x*30,this.b2Body.GetPosition().y*30,this.width/2,0,2*Math.PI);
    contact.context.stroke();
};

cricleSprite.setPosition([40,40]);


var fixDef2 = new b2FixtureDef;
fixDef2.density = 1.0;
fixDef2.friction = 0.5;
fixDef2.restitution = 0.2;
fixDef2.shape = new b2CircleShape(cricleSprite.width/60);

var bodyDef2 = new b2BodyDef;

bodyDef2.type = b2Body.b2_dynamicBody;
// bodyDef2.type = b2Body.b2_staticBody;
bodyDef2.position.x = (cricleSprite.x())/30; ;
bodyDef2.position.y = (cricleSprite.y())/30; ;
cricleSprite.b2Body = win.world.CreateBody(bodyDef2);


cricleSprite.b2Body.CreateFixture(fixDef2);




scene.addChild(cricleSprite);


var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(win.BContext);
debugDraw.SetDrawScale(30.0);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
win.world.SetDebugDraw(debugDraw);


director.init(win);

director.run();


setInterval(function () {
    // bodySprite.setPosition([bodySprite.x()+1,bodySprite.y()]);
},1000/60);

//1.创建一个世界


//2.创建一个矩形刚体
//定义一个材质
// var fixDef = new b2FixtureDef;
// fixDef.density = 1.0;//密度
// fixDef.friction = 0.5;//摩擦
// fixDef.restitution = 0.2;//弹性
// fixDef.shape = new b2PolygonShape;//矩形
// fixDef.shape.SetAsBox(5, 0.5);//宽高
// //创建一个矩形地板刚体
// var bodyDef = new b2BodyDef;
// bodyDef.type = b2Body.b2_staticBody;//静态的
// bodyDef.position.x = 10;    //X轴
// bodyDef.position.y = 13;    //Y轴
// //世界中添加一个刚体
// world.CreateBody(bodyDef).CreateFixture(fixDef);


// //3.同上创建一个圆形刚体
// var fixDef2 = new b2FixtureDef;
// fixDef2.density = 1.0;
// fixDef2.friction = 0.5;
// fixDef2.restitution = 0.2;
// fixDef2.shape = new b2CircleShape(1);
//
// var bodyDef2 = new b2BodyDef;
// bodyDef2.type = b2Body.b2_dynamicBody;
// bodyDef2.position.x = 9;
// bodyDef2.position.y = 1;
// win.world.CreateBody(bodyDef2).CreateFixture(fixDef2);


// // 4.setup debug draw
// var debugDraw = new b2DebugDraw();
// debugDraw.SetSprite(win.BContext);
// debugDraw.SetDrawScale(30.0);
// debugDraw.SetFillAlpha(0.3);
// debugDraw.SetLineThickness(1.0);
// debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
// win.world.SetDebugDraw(debugDraw);

//5.一帧帧执行
// window.setInterval(update, 1000 / 60);
// function update() {
//     //Take a time step.
//     win.world.Step(
//         1 / 60   //frame-rate
//         ,  10       //velocity iterations
//         ,  10       //position iterations
//     );
//     //Call this to draw shapes and other debug draw data.
//     win.world.DrawDebugData();
//     //Call this after you are done with time steps to clear the forces. You normally call this after each call to Step, unless you are performing sub-steps.
//     // win.world.ClearForces();
//     bodySprite.draw({context:win.BContext});
//     //console.log(111);
//     // bodySprite.bodyDef.position.x = bodySprite.bodyDef.position.x+1/60;
//     // console.log(body.GetPosition());
//     cricleSprite.draw({context:win.BContext});
//     // bodySprite.setPosition([bodySprite.x()+1,bodySprite.y()]);
// }
