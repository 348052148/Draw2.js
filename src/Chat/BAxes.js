/**
 * Created by msbox on 2017/12/10.
 */
import BNode from '../Node/BNode.js'
import BPoint from '../Base/BPoint.js'
import BPaint from "../Base/BPaint";


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
        let Paint = BPaint.from(context);
        Paint.save();
        Paint.lineWidth(4);
        Paint.beginPath();
        Paint.moveTo(this.core[0], this.core[1]);
        Paint.lineTo(this.x()+this.horizontal, this.vertical);

        Paint.moveTo(this.core[0], this.core[1]);
        Paint.lineTo(this.x(), this.y());
        this.drawArrow(context);
        Paint.stroke();
        Paint.restore();


        this.drawScale(context);

        Paint.stroke();
    }


    drawScale(context){
        let Paint = BPaint.from(context);
        Paint.lineWidth(1);
        for(let i=1;i<this.scaleNumX;i++){
            Paint.moveTo(this.core[0]-5, this.core[1]-i*this.verticalInterval);
            Paint.lineTo(this.core[0]+5, this.core[1]-i*this.verticalInterval);
            Paint.lineWidth (1);
            Paint.font("14px 宋体");
            let v = Paint.measureText(parseInt(this.startVal+(this.inter*(i-1)))).width+10;
            Paint.strokeText(parseInt(this.startVal+(this.inter*(i-1))),this.core[0]-v ,this.core[1]-i*this.verticalInterval+6);
        }

        for(let i=1;i<this.scaleNumY;i++){
            Paint.moveTo(this.core[0]+i*this.horizontalInterval, this.core[1]-5);
            Paint.lineTo(this.core[0]+i*this.horizontalInterval, this.core[1]+5);
            Paint.font("14px 宋体");
            Paint.strokeText(this.meta[i-1],this.core[0]+i*this.horizontalInterval-context.measureText(this.meta[i-1]).width/2, this.core[1]+30);
        }
    }

    drawArrow(context){
        let Paint = BPaint.from(context);
        Paint.moveTo(this.x(), this.y());
        Paint.lineTo(this.x()-10, this.y()+20);

        Paint.moveTo(this.x(), this.y());
        Paint.lineTo(this.x()+10, this.y()+20);

        Paint.moveTo(this.x()+this.horizontal, this.vertical);
        Paint.lineTo(this.x()+this.horizontal-20, this.vertical+10);

        Paint.moveTo(this.x()+this.horizontal, this.vertical);
        Paint.lineTo(this.x()+this.horizontal-20, this.vertical-10);

    }
}

export default BAxes;