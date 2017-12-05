import BDraw from './BDraw.js'
class BContainer extends BDraw {

    constructor(){
        super();
        this.nodeList=new Array();
        this.parentNode = null;
        this.z_index = 0;
    }

    addChild(container){
        this.nodeList.push({uuid:container.UUID,node:container});
        container.setParentNode(this);
        this.z_index ++;
    };

    setParentNode(container) {
        this.parentNode = container;
    };


    getParentNode() {
        return this.parentNode;
    };

    removeChild(container){
        for(var i=0;i<this.nodeList.length;i++)
        {
            if(this.nodeList[i].uuid == container.UUID){
                this.nodeList.splice(i,1);
                break;
            }

        }
    };

    setZindex(val){
        this.getParentNode().nodeList[val] = {uuid:this.UUID,node:this};
        this.getParentNode().removeChild(this);
    };



}

export default BContainer;