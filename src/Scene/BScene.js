import BNode from '../Node/BNode.js'
import BPaint from '../Base/BPaint.js'
class BScene extends BNode{

    constructor(width,height){
        super();
        this.width = width;
        this.height = height;
    }

    draw(contact){
        // this.Paint.clearRect(0,0,this.width,this.height);
        let paint = new BPaint(contact.context);
        paint.clearRect(0,0,this.width,this.height);
        this.topDraw(contact);
        // console.log('DSCENE');
    };

    toString(){
        return 'BScene Object';
    };
}

export default BScene;