/**
 * 使用此类来进行路径描述 不承担绘制作用
 */
import BPaint from '../Base/BPaint.js'
import BContainer from '../Base/BContainer.js'
class BPath extends BContainer{

    constructor(context){
        super();
        // 描述对象
        this._describList = [];
    }
    // 绘制直线
    line(pos1,pos2){
        this._describList.push({action:'line',params:[pos1,pos2]});
    }

    // 绘制 bezier 曲线
    bezier(posArr){
        this._describList.push({action:'bezier',params:[posArr]});
    }

    arc(x,y,radius,startAnglr,endAngle,antclockwise){
        this._describList.push({action:'arc',params:[x,y,radius,startAnglr,endAngle,antclockwise]});
    }

    arcTo(x1,y1,x2,y2,radius){
        this._describList.push({action:'arcTo',params:[x1,y1,x2,y2,radius]});
    }

    rect(x,y,w,h){
        this._describList.push({action:'rect',params:[x,y,w,h]});
    }

    // 多边形
    polygon(posArr){
        this._describList.push({action:'polygon',params:[posArr]});
    }



    analysis(context){
        this.Paint = BPaint.from(context);
        this.Paint.beginPath();
        this._describList.forEach((elem) => {
            switch(elem.action) {
                case 'line':
                    this.Paint.moveTo(elem.params[0].x(),elem.params[0].y());
                    this.Paint.lineTo(elem.params[1].x(),elem.params[1].y());
                    break;
                case 'bezier':
                    if(posArr.length > 1){

                    }
                    break;
                case 'arc':
                    this.Paint.arc(elem.params[0],elem.params[1],elem.params[2],elem.params[3],elem.params[4],elem.params[5]);
                    break;
                case 'arcTo':
                    this.Paint.arcTo(elem.params[0],elem.params[1],elem.params[2],elem.params[3],elem.params[4]);
                    break;
                case 'rect':
                    this.Paint.rect(elem.params[0],elem.params[1],elem.params[2],elem.params[3]);
                    break;
                case  'polygon':
                    this.Paint.moveTo(elem.params[0][0].x(),elem.params[0][0].y());
                    for (let i=1;i<elem.params[0].length;i++){
                        this.Paint.lineTo(elem.params[0][i].x(),elem.params[0][i].y());
                    }
                    //
                    break;
            }
        });
        this.Paint.closePath();
        return this;
    }

    fill(style = {}){
        this.Paint.fill();
    }

    stroke(style = {}){
        this.Paint.stroke();
    }

}

export default BPath;