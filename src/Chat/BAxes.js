/**
 * Created by msbox on 2017/12/10.
 */
import BNode from '../Node/BNode.js'
import BPoint from '../Base/BPoint.js'


class BAxes extends BNode{

    constructor(interval,vlen=7,hlen=7,vertical=700,horizontal=1000,meta){
        super();
        this.basePos = new BPoint();
        
        this.vertical = vertical;
        this.horizontal = horizontal;
        this.setPosition([100,100]);

        this.core = [this.x(), this.vertical];

        this.scaleNumX = vlen+2;

        // 绘制的 每格比例尺
        this.inter = interval / vlen;

        // 绘制的每格高度间隔
        this.verticalInterval = Math.floor(this.vertical/(this.scaleNumX+1));


        this.scaleNumY = hlen+1;

        // 绘制的每格宽度间隔
        this.horizontalInterval = Math.floor(this.horizontal/this.scaleNumY);

        this.startVal = 100;

        this.meta = meta;

    }

    draw(contact,context){

        context.save();
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(this.core[0], this.core[1]);
        context.lineTo(this.x()+this.horizontal, this.vertical);

        context.moveTo(this.core[0], this.core[1]);
        context.lineTo(this.x(), this.y());
        this.drawArrow(context);
        context.stroke();
        context.restore();


        this.drawScale(context);

        context.stroke();
    }


    drawScale(context){
        context.lineWidth = 1;
        for(let i=1;i<this.scaleNumX;i++){
            context.moveTo(this.core[0]-5, this.core[1]-i*this.verticalInterval);
            context.lineTo(this.core[0]+5, this.core[1]-i*this.verticalInterval);
            context.lineWidth = 1;
            context.font="14px 宋体";
            let v = context.measureText(parseInt(this.startVal+(this.inter*(i-1)))).width+10;
            context.strokeText(parseInt(this.startVal+(this.inter*(i-1))),this.core[0]-v ,this.core[1]-i*this.verticalInterval+6);
        }

        for(let i=1;i<this.scaleNumY;i++){
            context.moveTo(this.core[0]+i*this.horizontalInterval, this.core[1]-5);
            context.lineTo(this.core[0]+i*this.horizontalInterval, this.core[1]+5);
            context.font="14px 宋体";

            context.strokeText(this.meta[i-1],this.core[0]+i*this.horizontalInterval-context.measureText(this.meta[i-1]).width/2, this.core[1]+30);
        }
    }

    drawArrow(context){

        context.moveTo(this.x(), this.y());
        context.lineTo(this.x()-10, this.y()+20);

        context.moveTo(this.x(), this.y());
        context.lineTo(this.x()+10, this.y()+20);

        context.moveTo(this.x()+this.horizontal, this.vertical);
        context.lineTo(this.x()+this.horizontal-20, this.vertical+10);

        context.moveTo(this.x()+this.horizontal, this.vertical);
        context.lineTo(this.x()+this.horizontal-20, this.vertical-10);

    }
}

export default BAxes;