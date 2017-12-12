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
import BLineChart from './Chat/BLineChart.js'
import BPath from './Drafting/BPath.js'
import BPoint from './Base/BPoint.js'

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
app.createWindow(0,0,1800,800,'1px solid #000',document.body,60);

let director = new BDirector(app);

let scene = new BScene();
scene.width=1800;
scene.height=800;

director.addScene(scene);

let data = [100,300,400,200,500,1000,450,300,350];

let meta = ['2017-01-12','2017-01-13','2017-01-14','2017-01-15','2017-01-16','2017-01-17','2017-01-17','2017-01-17','2017-01-17'];

let lineChart = new BLineChart(data,meta);

lineChart.setPosition([100,100]);

lineChart.init();

// scene.addChild(lineChart);

lineChart.addEventListener('mousedown',function () {
    let data = [100,300,400,200,500,1000,450,300,750];
    lineChart.setData(data);
});

let pathTest = new BSprite(100,100);

pathTest.draw = function (c,context) {
    let path = new BPath();
    path.polygon([
        new BPoint([0,0]),
        new BPoint([100,100]),
        new BPoint([300,200]),
        new BPoint([200,50])
    ]);
    path.analysis(context);
    path.fill();
};

scene.addChild(pathTest);

director.run();





