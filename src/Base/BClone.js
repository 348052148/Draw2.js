/**
 * 克隆对象 继承此类可提供 clone 操作
 */
import BObject from './BObject.js'
class BClone extends BObject{
    constructor(){
        super();
    }
    clone(){
        let o, obj;
        obj=this;
        if (obj.constructor == Object){
            o = new obj.constructor();
        }else{
            o = new obj.constructor(obj.valueOf());
        }
        for(var key in obj){
            if ( o[key] != obj[key] ){
                if ( typeof(obj[key]) == 'object' ){
                    // o[key] = this.clone(obj[key]); //这里屏蔽了深层复制
                }else{
                    o[key] = obj[key];
                }
            }
        }
        o.toString = obj.toString;
        o.valueOf = obj.valueOf;
        return o;
    }
}

export default BClone;