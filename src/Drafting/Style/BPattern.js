/**
 *  贴图绘制类
 */
import BStyle from './BStyle.js'
class BPattern extends BStyle{
    constructor(){
        super();
    }
    createLinearGradient(x1, y1, x2, y2){
        return this.createLinearGradient(x1,y1,x2,y2);
    }
    // 创建环型渐变
    createRadialGradient(x1, y1, r1, x2, y2, r2){
        return this.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    // 渐变节点配置
    addColorStop(gradient,pos,color){
        return gradient.addColorStop(pos,color);
    }
    // ctx.fillStyle = ptrn; 以图片创建填充样式
    createPattern(image, type){
        this.push('createPattern',[image, type]);
    }


}