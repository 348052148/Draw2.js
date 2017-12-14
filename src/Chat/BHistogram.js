import BNode from '../Node/BNode.js'
import BPen from '../Drafting/BPen.js'

class BHistogram extends BNode{

    constructor(width,height,val){
        super();
        this.data = null; //记录节点数据
        this.width = width;
        this.height = height;

        this.oldElemet = null;

        this.isHover = false;

        this.val = val;
    }

    draw(contact,context){
        let pathGroup = BPen.PathGroup()
        .path()
        .rect(this.x(),this.y(),this.width,this.height).style({'fillStyle':'blue'})
        
        if(this.isHover){
            pathGroup.style({fillStyle:'green'});
        }
        pathGroup.fill(context);

        BPen.Text().font("14px 宋体").setText(this.val,this.x()-10,this.y()-this.height/2-10).stroke(context);

    }

}

export default BHistogram;