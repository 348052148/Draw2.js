/**
 * Draw2.js 原始对象 理论上任何draw2.js 元素都应继承BObject UUID 提供唯一标识
 */
import BUtils from '../Tools/BUtils.js'

class BObject {

    constructor(){
        this.name='BObject';
        this.UUID = BUtils.uuid();
    }

    toString(){
        return 'BObject Object';
    }
};

export default BObject;