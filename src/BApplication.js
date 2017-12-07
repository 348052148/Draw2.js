import BUtils from './Tools/BUtils.js'
import BEvent from './Events/BEvent.js'
class BApplication {

    constructor(){
        this.BContext = null;
        this.width = 0;
        this.height = 0;
        this.fps = 0;
        this.canvasObj = null;
        this.canvasId = BUtils.uuid();

        this.eventLoop = new Array();

    }
    init(){
        this.BContext=document.getElementById(this.canvasId).getContext("2d");
    }

    //todo 系统事件 继承dom原生事件
    initEvent(){
        ['keydown','keyup'].forEach( (eventType)=> {
            document.addEventListener(eventType,()=>{
                this.event().emit(eventType);
            });
        });
        ['mousedown','mouseup','mousemove','mouseout','mouseover','dblclick'].forEach((eventType) => {
            this.canvasObj.addEventListener(eventType,()=>{
                this.event().emit(eventType);
            });
        });
    }

    event(){
        return BEvent.from(this.eventLoop);
    }

    createWindow(x,y,w,h,borderStyle,ele,fps){
        this.canvas=document.createElement("canvas");
        this.canvas.style.left=x+'px';
        this.canvas.style.top=y+'px';
        this.canvas.width=w;
        this.canvas.height=h;
        this.width=w;
        this.height=h;
        this.canvas.style.border=borderStyle;
        this.canvas.id=this.canvasId;
        if(fps == undefined || fps == null) fps=1000/60;
        this.fps=fps;
        ele.appendChild(this.canvas);
        this.canvasObj = this.canvas;

        this.init();
        this.initEvent();
    }
    end(){}
    toDataURL() {
        return this.canvasObj.toDataURL();
    }
    toBlob() {
        return this.canvasObj.toBlob();
    }
    mozGetAsFile () {
        return this.canvasObj.mozGetAsFile();
    }
    mozFetchAsStream () {
        return this.canvasObj.mozFetchAsStream();
    }

}

export default BApplication;