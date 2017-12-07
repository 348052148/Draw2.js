
class BEvent {
    constructor(eventLoop){
        this.eventLoop = eventLoop;
    }
    static from(eventLoop){
        if( BEvent.event == null )  BEvent.event = new BEvent(eventLoop);
        BEvent.event.eventLoop = eventLoop;
        return BEvent.event;
    }
    on(event,callback){
        this.eventLoop.push({event:event,callback:callback,isOnce:false});
    }

    once(){
        this.eventLoop.push({event:event,callback:callback,isOnce:true});
    }

    //todo 触发事件
    emit(event){
        let eventInfo = this.eventLoop.find(function (value,index) {
            return value.event == event;
        });
        if(eventInfo) eventInfo.callback();
    }
}

export default BEvent;