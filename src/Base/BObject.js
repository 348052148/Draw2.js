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