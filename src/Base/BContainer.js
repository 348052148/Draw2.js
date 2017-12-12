/**
 * 容器对象
 */
import BClone from './BClone.js'
class BContainer extends BClone {

    constructor(){
        super();
        this.nodeList=new Array();
        this.parentNode = null;
        this.z_index = 0; // 当前对象的z_index
    }

    addChild(container){
        this.nodeList.push({uuid:container.UUID,node:container});
        container.setParentNode(this);
        this.z_index ++;

    };

    /**
     * 获取所有节点对象
     * @returns {Array}
     */
    getNodeList(){
        let tmpList = [];
        this.nodeList.forEach(function (value) {
            tmpList.push(value.node);
        });
        return tmpList;
    }

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
    }
    removeAllChild(){
        this.nodeList = [];
    }

    setZindex(val){
        this.getParentNode().nodeList[val] = {uuid:this.UUID,node:this};
        this.getParentNode().removeChild(this);
    };



}

export default BContainer;