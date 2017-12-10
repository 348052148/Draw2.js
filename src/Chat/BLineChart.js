/**
 * Created by msbox on 2017/12/10.
 */

import BNode from '../Node/BNode.js'
import BAxes from './BAxes.js'

export class BElement extends BNode{

    constructor(width){
        super();
        this.data = null; //记录节点数据
        this.width = width;

        this.oldElemet = null;
    }

    draw(contact,context){
        context.beginPath();
        context.arc(this.x(),this.y(),this.width/2,0,2*Math.PI);
        context.stroke();
        if(this.oldElemet !=null){
            context.beginPath();
            context.moveTo(this.oldElemet.x(), this.oldElemet.y());
            context.lineTo(this.x(), this.y());
            context.stroke();
        }
    }

    lineTo(elem){
        this.oldElemet = elem;
    }

}

class BLineChart extends BNode{

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
    }


    init(){
        this.addChild(this.axes);
        console.log(this.nodeList);
        this.drawElement();
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
        this.drawElement();
    }

    drawElement(){

        let oldElem = null;
        for(let i=0;i<this.data.length;i++){

            let posElem = new BElement(20);

            posElem.setPosition([
                this.axes.core[0]+this.axes.horizontalInterval*(1+i),
                this.axes.core[1]-(this.data[i]/this.axes.inter)*this.axes.verticalInterval
            ]);

            this.addChild(posElem);

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