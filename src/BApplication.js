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


    createDynamicCanvas(x,y,borderStyle){
        this.dynamicCanvas=document.createElement("canvas");
        this.dynamicCanvas.width= this.canvas.width;
        this.dynamicCanvas.height= this.canvas.height;
        this.BdynamicContext = this.dynamicCanvas.getContext("2d");
        this.dynamicCanvas.style.left=x+'px';
        this.dynamicCanvas.style.top=y+'px';
        this.dynamicCanvas.style.position = 'absolute';
        this.dynamicCanvas.style.border=borderStyle;
        return this.dynamicCanvas;
    }

    createStaticCanvas(x,y,borderStyle){
        this.staticCanvas=document.createElement("canvas");
        this.staticCanvas.width= this.canvas.width;
        this.staticCanvas.height= this.canvas.height;
        this.BstaticContext = this.staticCanvas.getContext("2d");
        this.staticCanvas.style.left=x+'px';
        this.staticCanvas.style.top=y+'px';
        this.staticCanvas.style.position = 'absolute';
        this.staticCanvas.style.border=borderStyle;
        return this.staticCanvas;
    }


    getContext(){
        return {
            'font':this.BContext,
            'static':this.BstaticContext,
            'dynamic':this.BdynamicContext,
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

        this.canvasObj = this.canvas;


        ele.appendChild(this.createBackCanvas(x,y,borderStyle));
        ele.appendChild(this.createStaticCanvas(x,y,borderStyle));
        ele.appendChild(this.createDynamicCanvas(x,y,borderStyle));
        ele.appendChild(this.canvas);
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