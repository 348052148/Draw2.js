/**
 * Created by msbox on 2017/12/10.
 */

import BNode from '../Node/BNode.js'
import BAxes from './BAxes.js'
import BPathGroup from '../Drafting/BPath.js'
import BInk from '../Drafting/Style/BInk.js'

export class BHistogram extends BNode{

    constructor(width,height){
        super();
        this.data = null; //记录节点数据
        this.width = width;
        this.height = height;

        this.oldElemet = null;

        this.isHover = false;
    }

    draw(contact,context){
        let pathGroup = new BPathGroup()
        .path()
        .rect(this.x(),this.y(),this.width,this.height).style({'fillStyle':'red'})
        
        if(this.isHover){
            pathGroup.setStyle(new BInk().fillStyle('green'));
        }
        pathGroup.fill(context);
    }

}

export class BBrokenLine extends BNode{

    constructor(width){
        super();
        this.data = null; //记录节点数据
        this.width = width;
        this.height = this.width;

        this.oldElemet = null;

        this.isHover = false;
    }

    draw(contact,context){
        let path = new BPathGroup().path().arc(this.x(),this.y(),this.width/2,0,2*Math.PI);
        if(this.isHover){
            path.fill(context);
        }else{
            path.stroke(context);
        }
        if(this.oldElemet !=null){
            path.path().line([this.oldElemet.x(), this.oldElemet.y()],[this.x(), this.y()]).stroke(context);
        }
    }

    lineTo(elem){
        this.oldElemet = elem;
    }

}

class BLineChart extends BNode{
    // data meta width=长度 height=宽度
    constructor(data,meta,width=1800,height=800){
        super();
        this.data = data;

        this.width = width;
        this.height = height;

        this.maxVal = Math.max.apply(Math,this.data);
        this.minVal = Math.min.apply(Math,this.data);

        // 绘制图形的总间隔
        let interval = this.maxVal - this.minVal;

        this.axes = new BAxes(interval,7,this.data.length,height-100,width-120,meta);

        this.elemList = [];

        this.addEventListener('mousemove',(e)=> {
            let list = this.getNodeList();
            list.forEach((v)=> {
                v.isHover = false;
               if((v.x() - this.axes.horizontalInterval/2) <= e.offsetX && e.offsetX <= (v.x() + this.axes.horizontalInterval/2)){
                   v.isHover = true;
               }
            });
        });

    }


    init(){
        this.addChild(this.axes);
        this.drawHistogram();
        this.setPosition([this.width/2,this.height/2]);
    }

    draw(contact,context){
        this.topDraw(contact,context);
    }

    setData(data){
        this.data = data;
        let elem = null;
        while (elem = this.elemList.pop()){
            this.removeChild(elem);
        }
        this.drawHistogram();
    }


    drawHistogram(){
        for(let i=0;i<this.data.length;i++){

            let posElem = new BHistogram(20,(this.data[i]/this.axes.inter)*this.axes.verticalInterval);

            posElem.setPosition([
                this.axes.core[0]+this.axes.horizontalInterval*(1+i),
                this.axes.core[1] - posElem.height/2
            ]);

            this.addChild(posElem);

            posElem.addEventListener('mouseover',function (e) {
                posElem.isHover = true;
            });

            posElem.addEventListener('mouseout',function (e) {
                posElem.isHover = false;
            });


            this.elemList.push(posElem);
        }
    }

    drawBrokenLine(){

        let oldElem = null;
        for(let i=0;i<this.data.length;i++){

            let posElem = new BBrokenLine(10);

            posElem.setPosition([
                this.axes.core[0]+this.axes.horizontalInterval*(1+i),
                this.axes.core[1]-(this.data[i]/this.axes.inter)*this.axes.verticalInterval
            ]);

            this.addChild(posElem);

            posElem.addEventListener('mouseover',function (e) {
                posElem.isHover = true;
            });

            posElem.addEventListener('mouseout',function (e) {
                posElem.isHover = false;
            });


            if(i==0){
                oldElem = posElem;
                continue;
            }

            posElem.lineTo(oldElem);

            oldElem = posElem;

            this.elemList.push(posElem);

        }

    }


}


export default BLineChart;