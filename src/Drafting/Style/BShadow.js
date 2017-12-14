/**
 *  阴影处理类
 */
import BStyle from './BStyle.js'
class BShadow extends BStyle{
    constructor(){
        super();
    }

    shadow(shadowOffsetX=0,shadowOffsetY=0,shadowBlur=0,shadowColor=''){
        this.push('setShadow',[shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor]);
        return this;
    }
}

export default BShadow;