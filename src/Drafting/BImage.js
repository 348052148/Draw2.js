import BPaint from '../Base/BPaint.js'
class BImage{

    constructor(context){
        this.Paint = new BPaint.from(context);
    }

    drawImage(image,x,y,w=null,h=null){
        this.Paint.drawImage(image,x,y,w,h);
    }

    drawImageCut(image,x,y,width,height,cutRegion){
        this.context.drawImage(image,cutRegion.sx,cutRegion.sy,cutRegion.swidth,cutRegion.sheight,x,y,width,height);
    }

}

export default BImage;