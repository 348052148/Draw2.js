/**
 * 文本绘制对象
 */
import BDisplay from './BDisplay.js'
class BText extends BDisplay{
    constructor(){
        super();
        this.text = '',
        this.textWidth = 0,
        this.x = 0,
        this.y = 0;
    }

    setText(text,x,y){
        this.text = text;
        this.x = x;
        this.y = y;
        // this.textWidth = this.measureText();
        return this;
    }

    font(font){
        this.pushDesc('font',[font]);
        return this;
    }

    //设置或返回文本内容的当前对齐方式 start, end, left, right or center. 默认值是 start。
    textAlign(textAlign){
        this.pushDesc('textAlign',[textAlign]);
        return this;
    }

    //设置或返回在绘制文本时使用的当前文本基线 top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
    textBaseline(textBaseline){
        this.pushDesc('textBaseline',[textBaseline]);
        return this;
    }

    //文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
    direction (val) {
        this.pushDesc('direction',[val]);
        return this;
    }

    //在画布上绘制“被填充的”文本
    fill(context,maxWidth=0){
        this.pushDesc('fillText',[this.text,this.x,this.y,maxWidth]);
        this.analysis(context);
        return this;
    }

    //在画布上绘制文本（无填充）
    stroke(context,maxWidth=0){
        this.pushDesc('strokeText',[this.text,this.x,this.y,maxWidth]);
        this.analysis(context);
        return this;
    }

    //返回包含指定文本宽度的对象
    measureText(){
        this._describList.push({action:'measureText',params:[]});
    }

}

export default BText;