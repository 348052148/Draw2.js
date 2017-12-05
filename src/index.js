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
let director = new BDirector();


let win = new BApplication();
win.createWindow(0,0,800,600,'1px solid #000',document.body,60);
win.init()


director.init(win);

let sceneLayer1 =new BScene(800,600);
let sceneLayer2 = new BScene(800,600);
let sceneLayer3 = new BScene(800,600);
let sceneLayer4 = new BScene(800,600);
let sceneLayer5 = new BScene(800,600);
let sceneLayer6 = new BScene(800,600);
director.addScene(sceneLayer1);
director.addScene(sceneLayer2);
director.addScene(sceneLayer3);
director.addScene(sceneLayer4);
director.addScene(sceneLayer5);
director.addScene(sceneLayer6);

let rectSprite1 = new BSprite(100,100);

rectSprite1.setPosition([100,100]);

let box = new BBollMove(4,4,[800,600]);

rectSprite1.runAction(box);

sceneLayer1.addChild(rectSprite1);

let textSprite=new BTextSprite();
//
textSprite.height = 20;

textSprite.setFontStyle('20px Arial');

textSprite.setText('WELLCOMEＴＯ');

textSprite.setPosition([100,500]);

sceneLayer1.addChild(textSprite);



for(let i=0;i<2000;i++){
    let p1 = new BSprite(10,10);
    p1.i = i;
    p1.draw = function (contact) {
        this.Paint = new BPaint(contact.context);
        let r = parseInt(Math.random()*255);
        let g = parseInt(Math.random()*255);
        let b = parseInt(Math.random()*255);
        // BApplication.BContext.fillStyle =" rgb("+r+","+g+","+b+")";
        this.Paint.setColor(" rgb("+r+","+g+","+b+")");
        this.Paint.fillRect(this.x(),this.y(),10,10);
    };
    p1.setScale(0.5,0.5);

    p1.setPosition([100,100]);

    let bx = parseInt(Math.random()*100);

    let by = parseInt(Math.random()*100);

    if(by > 10){
        by = -parseInt(by /10);
    }
    if(bx > 10){
        bx = -parseInt(bx /10);
    }

    p1.runAction(new BBollMove(bx,by,[800,600]));

    sceneLayer2.addChild(p1);

}



//todo 进度条
var progressBar = new BProgressBar();
progressBar.setWidth(win.width-200);
progressBar.setHeight(10);
progressBar.setPosition([100+(win.width-200)/2,win.height/2]);
sceneLayer3.addChild(progressBar);

progressBar.runAction(new BRotate(0.01));

var explorer = new BExplorer(director);
explorer.loadImages({
    PaperBoy2: "http://img.taopic.com/uploads/allimg/140322/235058-1403220K93993.jpg",
    PaperBoy3: "http://img.taopic.com/uploads/allimg/140320/235006-140320195A921.jpg",
    PaperBoy4: "http://pic18.nipic.com/20111206/2256974_131330799000_2.jpg",
    PaperBoy100: "../Assets/image/forward.png"

},function (loadedImages,numImages) { //加载中回调
    progressBar.setLength(numImages);
    progressBar.setVal(loadedImages);
},function () { //加载完成回调

    //动画
    var animateSprite = new BSprite(200,200);
    var banimate = new BAnimate(200);
    banimate.splitImage(8,explorer.IMG['PaperBoy100']);
    animateSprite.setPosition([200,200]);
    animateSprite.runAction(banimate);
    animateSprite.runAction(new BMoveTo(600,200,1));
    sceneLayer6.addChild(animateSprite);

});


let bimageSprite = new BImageSprite();

bimageSprite.setImageData(explorer.IMG['PaperBoy2']);


bimageSprite.setScale(0.1,0.1);

bimageSprite.setPosition([100,100]);

bimageSprite.runAction(new BMoveTo(700,500,2));

sceneLayer4.addChild(bimageSprite);



for(let j=0;j<20;j++){
    let reSprite = new BSprite(100,100);
    reSprite.setScale(0.5,0.5);
    let tr1 = new BTrajectory();
    tr1.join(800,600,2);
    //    tr.join(100,400,8).join(400,100,4).join(400,400,2).join(600,200,2);
    for(let i =0;i < 100;i++){
        tr1.join(parseInt(Math.random()*win.width),parseInt(Math.random()*win.height),parseInt(Math.random()*8));
    }
    reSprite.runAction(tr1);
    sceneLayer5.addChild(reSprite);
}


director.switchScene(sceneLayer6);











director.run();

