import BPhysicsNode from "../Node/BPhysicsNode.js"
import BPaint from '../Base/BPaint.js'

class BPhysicsSprite extends BPhysicsNode{

    constructor(w=100,h=100){
        super();
        this.width = w;
        this.height = h;
        this.isBody = false;

        this.b2Body = null;
    }

    draw(contact) {
        // console.log('SPRITE DRAW');
        let paint = BPaint.from(contact.context);
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
export default BPhysicsSprite;