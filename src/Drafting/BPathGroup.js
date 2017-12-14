import BPath from './BPath'
/**
 * 绘制路径组
 */
class BPathGroup{
    constructor(){
        this.pathList = [];
        this.currentPath = null;
    }
    setStyle(style){
        this.currentPath.setStyle(style);
        return this;
    }

    style(css){
        this.currentPath.style(css);
        return this;
    }

    path(){
        this.currentPath = new BPath();
        this.pathList.push(this.currentPath);
        return this;
    }

    line(pos1,pos2){
        this.currentPath.line(pos1,pos2);
        return this;
    }

    // 绘制 bezier 曲线
    bezier(posArr){
        this.currentPath.bezier(posArr);
        return this;
    }

    arc(x,y,radius,startAnglr,endAngle,antclockwise){
        this.currentPath.arc(x,y,radius,startAnglr,endAngle,antclockwise);
        return this;
    }

    arcTo(x1,y1,x2,y2,radius){
        this.currentPath.arc(x1,y1,x2,y2,radius);
        return this;
    }

    rect(x,y,w,h){
        this.currentPath.rect(x,y,w,h);
        return this;
    }

    // 多边形
    polygon(posArr){
        this.currentPath.polygon(posArr);
        return this;
    }

    fill(context){
        this.currentPath.fill();
        this.currentPath.analysis(context);
        return this;
    }

    stroke(context){
        this.currentPath.stroke();
        this.currentPath.analysis(context);
        return this;
    }
}
export default BPathGroup;