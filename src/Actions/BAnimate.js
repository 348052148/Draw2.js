import BAction from './BAction.js'
import BPaint from '../Base/BPaint.js'
import BSchedule from '../Director/BSchedule.js'
class BAnimate extends BAction{

    constructor(speed){
        super();
        this.animateFrame = new Array();
        this.speed = (speed)?speed:1000;
        this.index =0;

        this.schedule = new BSchedule();

        this.schedule.schedule(()=> {
            this.index ++;
            if(this.index>=this.animateFrame.length) this.index=0;
        },this.speed);
    }
    //自动创建AnimateFrame
    splitImage(w,image){
        for(var i=0;i<w;i++){
            this.animateFrame.push({x:i*(image.width/w),y:0,width:image.width/w,height:image.height,frameSource:image});
        }
        console.log(this.animateFrame);
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

    //demo 映射到节点的Draw上
    executed(obj){
        let that = this;
        obj.draw = function(contact){
            this.Paint = BPaint.from(contact.context);
            let currentTexture = that.animateFrame[that.index];
            this.Paint.drawImageCut(currentTexture.frameSource,
                currentTexture.x,
                currentTexture.y,
                currentTexture.width,
                currentTexture.height,
                this.x(),this.y(),
                currentTexture.width,
                currentTexture.height);
        }
    }

}

export default BAnimate;