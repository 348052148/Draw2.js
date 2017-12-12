/**
 * 已为颜料
 */
import BPaint from '../Base/BPaint.js'
class BPigment {
    constructor(context){
        this.Paint = BPaint.from(context);

        this.color = 'black';
    }

    setColor(color){
        this.Paint.setColor(color);
    }

    setGlobalAlpha(alpha){
        this.Paint.setGlobalAlpha(alpha);
    }
    // 重置颜料盒
    reset(){

    }

}