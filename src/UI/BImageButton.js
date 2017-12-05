import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BImageButton extends BNode{
    constructor(){
        super();
        this.backgoundImage = {};

        this.text = 'button';
        this.fontSize = 14;
    }

    setBackGroundImage  (image) {
        this.backgoundImage = image;
        this.width=image.width;
        this.height=image.height;
    };


    setText (text){
        this.text = text;
    };


    draw(contact){
        this.Paint = BPaint.from(contact.context);
        this.textWidth = this.Paint.measureText(this.text).width;

        this.Paint.drawImage(this.backgoundImage,this.x(),this.y(),this.width,this.height);
        //设置按钮文字
        this.Paint.font(this.fontSize+'px Arial');
        this.Paint.fillText(this.text,this.x()+(this.width-this.textWidth-this.fontSize)/2,this.y()+(this.height+this.fontSize)/2);

    };

}

export default BImageButton;