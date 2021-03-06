/**
 * 
 */
import BPaint from '../Base/BPaint.js'
import BDisplay from  './BDisplay.js'
class BPixel extends BDisplay{
    constructor(context){
        super();
        this.Paint = new BPaint(context);
        this.imageData = null; // data width height
    }

    createImageData(sw,sh){
        this.imageData = this.context.createImageData(sw,sh);
    }

    getImageData(sx,sy,sw,sh){
        this.imageData = this.Paint.getImageData(sx,sy,sw,sh);
        return this.imageData;
    };

    putImageData(dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight){
        return this.Paint.putImageData(this.imageData,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    };
}

export default BPixel;