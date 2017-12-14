import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
import BPen from '../Drafting/BPen.js'
class BSprite extends BNode {

    constructor(w=100,h=100){
        super();
        this.width = w;
        this.height = h;
        this.isDiplayCos = true;
    }

    draw(contact,context) {
        // console.log('SPRITE DRAW');
        let paint = BPaint.from(context);
        paint.setColor('#000');
        paint.strokeRect(this.x(), this.y(), this.width, this.height);

    }

    lastDraw(contact,context){
        //标出中心点
        if(this.isDiplayCos){
            BPen.PathGroup().path()
            .style({'fillStyle':'red'})
            .arc(this.position.x(),this.position.y(),2,0,Math.PI*2)
            .fill(context);
        }
    }

    call(){
        alert('call');
    };

    toString(){
        return 'BSprite Object';
    };

}

export default BSprite;