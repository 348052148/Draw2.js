/**
 * Created by msbox on 2017/12/10.
 */
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

scene.addChild(lineChart);

lineChart.addEventListener('mousedown',function () {
    alert(1);
    let data = [100,300,400,200,500,1000,450,300,750];
    lineChart.setData(data);
});


director.run();
