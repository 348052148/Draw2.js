/**
 * 使用此类来进行路径描述 不承担绘制作用
 */
import BDisplay from './BDisplay.js'
import BContainer from '../Base/BContainer.js'
class BPath extends BDisplay{

    constructor(){
        super();
    }
    // 绘制直线
    line(pos1,pos2){
        this.pushDescPath('line',[pos1,pos2]);
        return this;
    }

    // 绘制 bezier 曲线
    bezier(posArr){
        this.pushDescPath('bezier',[posArr]);
        return this;
    }

    arc(x,y,radius,startAnglr,endAngle,antclockwise){
        this.pushDescPath('arc',[x,y,radius,startAnglr,endAngle,antclockwise]);
        return this;
    }

    arcTo(x1,y1,x2,y2,radius){
        this.pushDescPath('arcTo',[x1,y1,x2,y2,radius]);
        return this;
    }

    rect(x,y,w,h){
        this.pushDescPath('rect',[x,y,w,h]);
        return this;
    }

    // 多边形
    polygon(posArr){
        this.pushDescPath('polygon',[posArr]);
        return this;
    }

    fill(){
        this.pushDescPath('fill',[]);
        return this;
    }

    stroke(){
        this.pushDescPath('stroke',[]);
        return this;
    }

}
export default BPath;