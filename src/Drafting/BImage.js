import BPaint from '../Base/BPaint.js'
import BDisplay from './BDisplay.js'
class BImage extends BDisplay{

    constructor(){
        super();
    }

    drawImage(image,x,y,w=null,h=null){
        this.pushDesc('drawImage',[image,x,y,w,h]);
        return this;
    }

    drawImageCut(image,x,y,width,height,cutRegion){
        this.pushDesc('drawImageCut',[image,cutRegion.sx,cutRegion.sy,cutRegion.swidth,cutRegion.sheight,x,y,width,height]);
        return this;
    }

    draw(context){
        this.analysis(context);
    }

}

export default BImage;