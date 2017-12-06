import BUtils from './Tools/BUtils.js'
class BApplication {

    constructor(){
        this.BContext = null;
        this.width = 0;
        this.height = 0;
        this.fps = 0;
        this.canvasObj = null;
        this.canvasId = BUtils.uuid();
        this.world = null;

    }
    init(){
        this.BContext=document.getElementById(this.canvasId).getContext("2d");
    }

    createWindow(x,y,w,h,borderStyle,ele,fps){
        let canvas=document.createElement("canvas");
        canvas.style.left=x+'px';
        canvas.style.top=y+'px';
        canvas.width=w;
        canvas.height=h;
        this.width=w;
        this.height=h;
        canvas.style.border=borderStyle;
        canvas.id=this.canvasId;
        if(fps == undefined || fps == null) fps=1000/60;
        this.fps=fps;
        ele.appendChild(canvas);
        this.canvasObj = canvas;
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