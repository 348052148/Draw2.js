import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BScene extends BNode{

    constructor(){
        super();

    }

    draw(contact,context){
        BPaint.from(context).clearRect(0,0,this.width,this.height);

    };

    toString(){
        return 'BScene Object';
    };

}

export default BScene;