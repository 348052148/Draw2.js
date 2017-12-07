import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BScene extends BNode{

    constructor(){
        super();

    }

    draw(contact){
        // BPaint.from(contact.context).clearRect(0,0,this.width,this.height);
        this.debugDraw();
    };

    toString(){
        return 'BScene Object';
    };

    debugDraw(){
        this.b2World.DrawDebugData();
        this.b2World.ClearForces();
    }
}

export default BScene;