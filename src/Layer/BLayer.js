import BNode from '../Node/BNode.js'

class BLayer extends BNode{
    constructor(){
        super();
    }
    draw(contact){
        this.topDraw(contact);
    };
    toString(){
        return 'BLayer Object';
    };
}

export default BLayer;