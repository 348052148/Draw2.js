import BNode from '../Node/BNode.js'
import BPen from '../Drafting/BPen.js'
class BBrokenLine extends BNode{

    constructor(width,val){
        super();
        this.data = null; //记录节点数据
        this.width = width;
        this.height = this.width;

        this.oldElemet = null;

        this.isHover = false;

        this.val = val;
    }

    draw(contact,context){
        let path = BPen.PathGroup().path().arc(this.x(),this.y(),this.width/2,0,2*Math.PI);
        if(this.isHover){
            path.fill(context);
            BPen.Text().font('14px 宋体').style({'strokeStyle':'#666'}).setText(this.val,this.x()-14,this.y()-10).stroke(context);
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
export default BBrokenLine;