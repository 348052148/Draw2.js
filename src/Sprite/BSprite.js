import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BSprite extends BNode {

    constructor(w,h){
        super();
        this.width = w;
        this.height = h;
    }

    draw(contact) {
        // console.log('SPRITE DRAW');
        let paint = BPaint.from(contact.context);
        paint.setColor('#000');
        paint.fillRect(this.x(), this.y(), this.width, this.height);

    }

    call(){
        alert('call');
    };

    toString(){
        return 'BSprite Object';
    };

}

export default BSprite;