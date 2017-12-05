import BSprite from './BSprite.js'
import BPaint from '../Base/BPaint.js'
class BImageSprite extends BSprite{
    constructor(){
        super(100,100);
        this.width=100;
        this.height=100;
        this.imgInfo={
            'model':'normal', /*normal change cut*/
            'elem':null,
            'sx':0,
            'sy':0,
            'swidth':0,
            'sheight':0
        };
    }

    setImageData(elem){
        this.imgInfo.elem=elem;
        this.width=elem.width;
        this.height=elem.height;
    };
    draw(contact){
        this.Paint = BPaint.from(contact.context);

        if(this.imgInfo.model == 'normal'){
            this.Paint.drawImage(this.imgInfo.elem,this.x(),this.y(),this.width,this.height);
        }else if(this.imgInfo.model == 'cut'){
            this.Paint.drawImageCut(this.imgInfo.elem,this.imgInfo.sx,this.imgInfo.sy,this.imgInfo.swidth,this.imgInfo.sheight,this.x(),this.y(),this.width,this.height);
        }else{

        }
    };
}

export default BImageSprite;