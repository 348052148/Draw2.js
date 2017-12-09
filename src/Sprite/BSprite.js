import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BSprite extends BNode {

    constructor(w=100,h=100){
        super();
        this.width = w;
        this.height = h;
    }

    draw(contact,context) {
        // console.log('SPRITE DRAW');
        let paint = BPaint.from(context);
        paint.setColor('#000');
        paint.strokeRect(this.x(), this.y(), this.width, this.height);

    }

    call(){
        alert('call');
    };

    toString(){
        return 'BSprite Object';
    };




}

export default BSprite;