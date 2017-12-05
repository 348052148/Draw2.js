import BAction from './BAction.js'
import BPaint from '../Base/BPaint.js'
class BAnimate extends BAction{
    constructor(){
        super();
        this.animateFrame = new Array();
        this.speed = (speed)?speed:1000;
        this.index =0;

        // this.schedule(function () {
        //     that.index ++;
        //     if(that.index>=that.animateFrame.length) that.index=0;
        // },this.speed);
    }
    //自动创建AnimateFrame
    splitImage(w,image){
        for(var i=0;i<w;i++){
            this.animateFrame.push({x:i*(image.width/w),y:0,width:image.width/w,height:image.height,frameSource:image});
        }
    };
    //自动创建AnimateFrame
    splitImageLattice(w,h,image){
        for(var i=0;i<h;i++){
            for(var j=0;j<w;j++){
                this.animateFrame.push({x:j*(image.width/w),y:i*image.height/h,width:image.width/w,height:image.height/h,frameSource:image});
            }
        }
    };

    addAnimateFrame(animateFrame) {

    };

    draw(obj){
        this.Paint = new BPaint();
        var currentTexture = this.animateFrame[this.index];
        this.Paint.drawImageCut(currentTexture.frameSource,currentTexture.x,currentTexture.y,currentTexture.width,currentTexture.height,obj.x(),obj.y(),currentTexture.width,currentTexture.height);
    };

}

export default BAnimate;