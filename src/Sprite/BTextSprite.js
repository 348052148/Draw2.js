import BSprite from './BSprite.js'
import BPaint from '../Base/BPaint.js'
class BTextSprite extends BSprite{


    constructor(){
        super(100,100);
        this.maxWidth=2000;

        this.color = '#000';

        this.tobj = {};
    }

    //设置内容
    setText(text){
        this.tobj.text=text;
    };
    //设置样式
    setFontStyle(fontStyle){
        this.tobj.font = fontStyle;
    };
    //设置对齐方式
    setAlign (align) {
        this.tobj.align = align;
    };

    setColor(color){
        this.color = color;
    };

    draw(contact){
        this.Paint = new BPaint(contact.context);
        this.width=this.Paint.measureText(this.tobj.text).width;

        this.Paint.setColor(this.color);

        if(this.tobj.font!=undefined && this.tobj.font!=null)
            this.Paint.font(this.tobj.font);
        if(this.tobj.align!= undefined && this.tobj.align!=null)
            this.Paint.textAlign(this.tobj.align);
        if(this.tobj.style=='stroke'){
            this.Paint.strokeText(this.tobj.text,this.x(),this.y(),this.maxWidth);
        }else{
            this.Paint.fillText(this.tobj.text,this.x(),this.y(),this.maxWidth);
        }
    };
}

export default BTextSprite;