/**
 * Created by msbox on 2017/12/10.
 */
import BNode from '../Node/BNode.js'
import BPoint from '../Base/BPoint.js'
import BPaint from '../Base/BPaint.js'
import BPen from '../Drafting/BPen.js'

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
        let pathGroup = BPen.PathGroup();

        pathGroup.path()

        .style({'lineWidth':4})
        // 坐标线
        .line([this.core[0], this.core[1]],[this.x()+this.horizontal, this.vertical])
        .line([this.core[0], this.core[1]],[this.x(), this.y()])
        // 箭头
        .line([this.x(), this.y()],[this.x()-10, this.y()+20])
        .line([this.x(), this.y()],[this.x()+10, this.y()+20])
        // 箭头
        .line([this.x()+this.horizontal, this.vertical],[this.x()+this.horizontal-20, this.vertical+10])
        .line([this.x()+this.horizontal, this.vertical],[this.x()+this.horizontal-20, this.vertical-10])
        .stroke(context);

        this.drawScale(pathGroup,context);
    }
    
    drawScale(pathGroup,context){
        let Paint = BPaint.from(context);

        pathGroup.path().style({'lineWidth':1});

        for(let i=1;i<this.scaleNumX;i++){

            pathGroup.line([this.core[0]-5, this.core[1]-i*this.verticalInterval],[this.core[0]+5, this.core[1]-i*this.verticalInterval]);
            
            let v = Paint.measureText(parseInt(this.startVal+(this.inter*(i-1)))).width+10;

            BPen.Text().font("14px 宋体").setText(parseInt(this.startVal+(this.inter*(i-1))),this.core[0]-v ,this.core[1]-i*this.verticalInterval+6)
            .stroke(context);
        }

        for(let i=1;i<this.scaleNumY;i++){
            pathGroup.line([this.core[0]+i*this.horizontalInterval, this.core[1]-5],[this.core[0]+i*this.horizontalInterval, this.core[1]+5]);

            BPen.Text().font("14px 宋体")
            .setText(this.meta[i-1],this.core[0]+i*this.horizontalInterval-context.measureText(this.meta[i-1]).width/2, this.core[1]+30)
            .stroke(context);
        }
        pathGroup.stroke(context);
    }
}

export default BAxes;