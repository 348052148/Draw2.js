import BPaint from '../Base/BPaint.js'
class BText {
    constructor(context){
        this.Paint = BPaint.from(context);
        this.text = '';
        this.textWidth = 0;
    }

    font(font){
        this.Paint.font=font;
    }

    setText(text){
        this.text = text;
        this.textWidth = this.measureText();
    }

    //设置或返回文本内容的当前对齐方式
    textAlign(textAlign){
        this.Paint.textAlign=textAlign;
    }

    //设置或返回在绘制文本时使用的当前文本基线
    textBaseline(textBaseline){
        this.Paint.textBaseline=textBaseline;
    }

    //在画布上绘制“被填充的”文本
    fillText(text,x,y,maxWidth){
        return this.Paint.fillText(text,x,y,maxWidth);
    }

    //文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
    direction (val) {
        this.Paint.direction = val;
    }

    //在画布上绘制文本（无填充）
    strokeText(x,y,maxWidth){
        return this.Paint.strokeText(this.text,x,y,maxWidth);
    }

    //返回包含指定文本宽度的对象
    measureText(){
        return this.Paint.measureText(this.text);
    }

}