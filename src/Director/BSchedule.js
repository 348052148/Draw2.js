import BUtils from '../Tools/BUtils.js'
class BSchedule{

    constructor(){
        this.scheduleList=new Array();
    }
    schedule(func,time){
        let sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },time),sid:sid});
        return sid;
    };
    schedulerUpdate(func){
        let sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },BGame.fps),sid:sid});
        return sid;
    };
    scheduleOnce(func,time){
        let sid=BUtils.uuid();
        this.scheduleList.push({schedule:setTimeout(function(){
            func();
        },time),sid:sid});
        return sid;
    };

    stopAllSchedule () {
        for(let i=0;i<this.scheduleList.length;i++){
            clearInterval(this.scheduleList[i].schedule);
        }
    };

    stopSchedule(sid){
        for(let i=0;i<this.scheduleList.length;i++){
            if(this.scheduleList[i].sid==sid){
                clearInterval(this.scheduleList[i].schedule);
                break;
            }
        }
    };
}

export default BSchedule;