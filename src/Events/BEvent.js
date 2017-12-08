import BEventEmitter from './BEventEmitter.js'
class BEvent {

    constructor(){
        this.isMouseIn = false;
        this.foucs = false;
    }

    addEventListener(event,callback,target){
        return BEventEmitter.from().on(event,callback,target);
    }
}

export default BEvent;