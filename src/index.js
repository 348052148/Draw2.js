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


let app = new BApplication();
app.createWindow(0,0,800,800,'1px solid #000',document.body,60);

let director = new BDirector(app);


let explorer = new BExplorer(director);
explorer.loadImages({
    arrow:arrow
},function (loadedImages,numImages) { //加载中回调

});

let scene = new BScene();
scene.width = 800;
scene.height = 800;

director.addScene(scene);

let sprite = new BSprite(100,100);

scene.addChild(sprite);

sprite.setPosition([200,200]);


director.run();

setInterval(function () {
    sprite.setPosition([sprite.x()+1,sprite.y()+1]);
    // app.BContext.drawImage(app.backCanvas,0,0);

},1000/60);



