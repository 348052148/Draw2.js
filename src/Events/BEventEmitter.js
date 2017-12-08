import BUtils from '../Tools/BUtils.js'
class BEventEmitter {
    constructor(){
        this.eventLoop = new Array();
    }
    static from(){
        if( BEventEmitter.event == null )  BEventEmitter.event = new BEventEmitter();
        return BEventEmitter.event;
    }
    on(event,callback,target){
        this.eventLoop.push({event:event,callback:callback,target:target,isOnce:false});
    }

    once(vent,callback,target){
        this.eventLoop.push({event:event,callback:callback,target:target,isOnce:true});
    }


    //todo 对象失去焦点事件
    handleBlur(event,target){
        let BlureventInfo = this.eventLoop.find(function (value,index) {
            if(value.event == 'blur' && value.target.UUID == target.UUID){
                return true
            }
            return false;
        });
        if(target.isFoucs()==true){
            target.setFoucs(false); //设置获取焦点
            if(BlureventInfo){
                BlureventInfo.callback(event);
            }
        }

    }
    //todo 对象获取焦点事件
    handleFoucs(event,target){
        let FoucseventInfo = this.eventLoop.find(function (value,index) {
            if(value.event == 'foucs' && value.target.UUID == target.UUID){
                return true
            }
            return false;
        });
        if(target.isFoucs()==false){
            target.setFoucs(true); //设置获取焦点
            if(FoucseventInfo){
                FoucseventInfo.callback(event);
            }
        }
        return false;

    }

    //todo 鼠标移出事件
    handleMouseOut(event,target){

        let OuteventInfo = this.eventLoop.find(function (value,index) {
            if(value.event == 'mouseout' && value.target.UUID == target.UUID){
                return true
            }
            return false;
        });
        if(target.isMouseIn()==true){
            target.setMouseIn(false); // 设置移除状态
            if(OuteventInfo){
                OuteventInfo.callback(event);
            }
            return true;
        }


        return false;
    }
    //todo 鼠标移入事件
    handleMouseIn(event,target){

        let IneventInfo = this.eventLoop.find(function (value,index) {
            if(value.event == 'mouseover' && value.target.UUID == target.UUID){
                return true
            }
            return false;
        });
        if(target.isMouseIn()==false){
            target.setMouseIn(true);
            if(IneventInfo){
                IneventInfo.callback(event);
            }else{

            }
        }
        return false;

    }
    //todo 其他属于鼠标移动事件
    handleMouseMove(event,target){
        // target.setMouseIn(true);
        let MoveeventInfo = this.eventLoop.find(function (value,index) {
            if(value.event == 'mousemove' && value.target.UUID == target.UUID){
                return true
            }
            return false;
        });
        if(MoveeventInfo){
            MoveeventInfo.callback(event);
        }
        return false;
    }

    //todo 触发事件
    emit(eventType,event){
        let eventInfo = this.eventLoop.find((value,index) => {
            if('mousemove' == eventType){
                if(['mousemove','mouseout','mouseover'].includes(value.event)){
                    // console.log(value.event);
                    //todo 2个ploye 但这在某些情况下会节约一些微弱的性能
                    let ploye = BUtils.matrix2rect(value.target.getMatrix());

                    let target = value.target;
                    if(BUtils.rayCasting({x:event.offsetX,y:event.offsetY},ploye)== 'out') {

                        this.handleMouseOut(event,target);
                        return false;
                    }
                    this.handleMouseMove(event,target);

                    return this.handleMouseIn(event,target)

                }
                //['mousemove','foucs','blur','mouseout','mouseover']
                if(['foucs','blur'].includes(value.event)){
                    //todo 2个ploye 但这在某些情况下会节约一些微弱的性能
                    let ploye = BUtils.matrix2rect(value.target.getMatrix());
                    let target = value.target;
                    if(BUtils.rayCasting({x:event.offsetX,y:event.offsetY},ploye)== 'out') {
                        this.handleBlur(event, target);
                        return false;
                    }
                    this.handleFoucs(event,target);
                    return false;
                }

                return false;
            }
            //todo 处理mousemove 特殊事件
            // if('mousemove' == value.event){
            //     //todo 2个ploye 但这在某些情况下会节约一些微弱的性能
            //     let ploye = BUtils.matrix2rect(value.target.getMatrix());
            //
            //     let target = value.target;
            //     if(BUtils.rayCasting({x:event.offsetX,y:event.offsetY},ploye)== 'out') {
            //         this.handleMouseOut(event,target);
            //         return false;
            //     }
            //     this.handleMouseIn(event,target);
            //
            //     this.handleMouseMove(event,target);
            //
            //     return true;
            // }

            //todo 过滤监听事件是否存在
            if(value.event != eventType) return false;

            //todo 按键事件
            if(['keydown','keyup'].includes(value.event)) return true;

            //todo 后续处理内部事件

            let ploye = BUtils.matrix2rect(value.target.getMatrix());

            if(BUtils.rayCasting({x:event.offsetX,y:event.offsetY},ploye)== 'out'){
                return false;
            }

            return true;
        });
        if(eventInfo) eventInfo.callback(event);
    }
}

export default BEventEmitter;