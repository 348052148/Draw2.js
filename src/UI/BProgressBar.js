import BNode from '../Node/BNode.js'
class BProgressBar extends BNode{

    constructor(){
        super();
        this.totalNumber = 0;
        this.currentNumber = 0;
        this.lineWidth = 10;

        this.backColor = "#eee";

        this.textColor ="#000";

        this.fontColor = "#000";

        this.fontStyle = {};
    }

    //设置
    setLength  (len) {
        this.totalNumber = len;
    };

    setVal (num) {
        this.currentNumber = num;
    };

    //设置底色
    setbackColor (color) {
        this.backColor = color;
    };
    //设置前色
    setfontColor (color) {
        this.fontColor = color;
    };

    setTextColor (color) {
        this.textColor =   color;
    };

    //设置进度条大小
    setRound (width){
        this.lineWidth = width;
    };

    setFontStyle (fontStyle) {
        this.fontStyle = fontStyle;
    };

    //绘图
    draw(contact){

        let ctx = contact.context;
        //设置样式
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.lineWidth=this.lineWidth;
        //设置字体样式
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.textColor;
        ctx.fillText('加 载 : '+this.currentNumber+' / '+this.totalNumber,this.x(),this.y());
        ctx.save();
        ctx.strokeStyle=this.backColor;
        ctx.beginPath();
        ctx.moveTo(this.x(),this.y()+this.height);
        ctx.lineTo(this.x()+this.width,this.y()+this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.restore();
        ctx.strokeStyle=this.fontColor;
        ctx.moveTo(this.x(),this.y()+this.height);
        ctx.lineTo(this.currentNumber/this.totalNumber*this.width+this.x(),this.y()+this.height);
        ctx.stroke();

        // this.topDraw();
    };
}

export default BProgressBar;