/**
 * 笔触
 */
import BStyle from './BStyle.js'
class BStrokes extends BStyle{
    constructor(){
        super();
    }

    //设置或返回线条的结束端点样式
    lineCap(val){
        this.push('lineCap',[val]);
        return this;
    };
    //设置或返回两条线相交时，所创建的拐角类型
    lineJoin(val){
        this.push('lineJoin',[val]);
        return this;
    };
    //设置或返回当前的线条宽度
    lineWidth(val){
        this.push('lineWidth',[val]);
        return this;
    };
    //设置或返回最大斜接长度
    miterLimit(val){
        this.push('miterLimit',[val]);
        return this;
    };
    //设置当前虚线样式
    setLineDash (val) {
        this.push('setLineDash',[val]);
        return this;
    };
    getLineDash () {
        return this.push('getLineDash',[val]);
    };
    //设置虚线样式的起始偏移量
    lineDasgOffset (val) {
        this.push('lineDasgOffset',[val]);
        return this;
    };

}

export default BStrokes;