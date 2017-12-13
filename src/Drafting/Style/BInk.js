/**
 *  墨水
 */
import BStyle from './BStyle.js'
class BInk extends BStyle{
    constructor(){
        super();
    }

    strokeStyle(color){
        this.push('strokeStyle',[color]);
        return this;
    }

    fillStyle(color){
        this.push('fillStyle',[color]);
        return this;
    }

    //设置透明度
    globalAlpha(gAlpha) {
        this.push('setGlobalAlpha',[gAlpha]);
        return this;
    };
}
export default BInk;