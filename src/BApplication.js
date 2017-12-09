import BUtils from './Tools/BUtils.js'
import BEventEmitter from './Events/BEventEmitter.js'
class BApplication {

    constructor(){
        this.BContext = null;
        this.width = 0;
        this.height = 0;
        this.fps = 0;
        this.canvasObj = null;
        this.canvasId = BUtils.uuid();

        this.eventEmitter = BEventEmitter.from();

    }
    init(){
        this.BContext=document.getElementById(this.canvasId).getContext("2d");
    }

    //todo 系统事件 继承dom原生事件
    initEvent(){
        ['keydown','keyup'].forEach( (eventType)=> {
            document.addEventListener(eventType,(event)=>{
                this.eventEmitter.emit(eventType,event);
            });
        });
        ['mousedown','mouseup','mousemove','mouseout','mouseover','dblclick'].forEach((eventType) => {
            this.canvasObj.addEventListener(eventType,(event)=>{
                this.eventEmitter.emit(eventType,event);
            });
        });
    }

    createBackCanvas(x,y,borderStyle){
        this.backCanvas=document.createElement("canvas");
        this.backCanvas.width= this.canvas.width;
        this.backCanvas.height= this.canvas.height;
        this.BbackContext = this.backCanvas.getContext("2d");
        this.backCanvas.style.left=x+'px';
        this.backCanvas.style.top=y+'px';
        this.backCanvas.style.position = 'absolute';
        this.backCanvas.style.border=borderStyle;
        return this.backCanvas;
    }

    getContext(){
        return {
            'font':this.BContext,
            'back':this.BbackContext
        }
    }

    createWindow(x,y,w,h,borderStyle,ele,fps){
        this.canvas=document.createElement("canvas");
        this.canvas.style.left=x+'px';
        this.canvas.style.top=y+'px';
        this.canvas.width=w;
        this.canvas.height=h;
        this.canvas.style.position = 'absolute';
        this.canvas.style.border=borderStyle;
        this.canvas.id=this.canvasId;
        this.width=w;
        this.height=h;

        if(fps == undefined || fps == null) fps=1000/60;
        this.fps=fps;
        ele.appendChild(this.canvas);
        this.canvasObj = this.canvas;

        this.init();
        this.initEvent();

        ele.appendChild(this.createBackCanvas(x,y,borderStyle));

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