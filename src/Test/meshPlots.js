import BApplication from '../BApplication'
import BDirector from '../Director/BDirector'
import BScene from '../Scene/BScene'
import BSprite from '../Sprite/BSprite'
import BPen from '../Drafting/BPen'
import BRotate from '../Actions/BRotate'
import BNode from '../Node/BNode'

let app = new BApplication();
app.createWindow(0,0,1800,800,'1px solid #000',document.body,60);

let director = new BDirector(app);

let scene = new BScene();
scene.width=1800;
scene.height=800;

director.addScene(scene);

let sprite = new BSprite(50,300);


sprite.setPosition([300,300]);

sprite.setAnchorPos([0.5,1]);

sprite.draw = function(contact,context){

    BPen.PathGroup().path().rect(this.x(),this.y(),this.width,this.height).stroke(context);
}

// sprite.runAction(new BRotate(0.1));

let sprite1 = new BSprite(50,300);

scene.addChild(sprite1);
sprite1.setPosition([100,300]);
scene.addChild(sprite);


director.run();