import BPaint from '../Base/BPaint.js'
import BObject from '../Base/BObject.js'
import BInk from './Style/BInk.js'
import BShadow from './Style/BShadow.js'
import BStrokes from './Style/BStrokes'
import BPattern from './Style/BPattern.js'
class BDisplay extends BObject{
    constructor(){
        super();
        // 描述对象
        this._describList = [];
        this._descriPath = [];
        this.isPath = false;
        this.isBegin = false;

        //style type func
        this.inkArr = ['strokeStyle','fillStyle','globalAlpha'];
        this.shadowArr = ['shadow'];
        this.strokesArr = ['lineCap','lineJoin','lineWidth','miterLimit','lineDash','lineDasgOffset'];

        this.ink = null;
        this.shadow = null;
        this.strokes = null;
        this.pattern = null;
    }

    analysis(context){
        this.Paint = BPaint.from(context);
        this.Paint.save();
        this._describList.forEach((elem) => {
            if(elem.type == 'draw'){
                this._drawImagePaint(elem);
                this._drawText(elem);
            }

            if(elem.type == 'style'){
                this._drawStyle(elem);
            }

            if(elem.type == 'path'){
                if(this.isPath && !this.isBegin){
                    this.Paint.beginPath();
                    this.isBegin = true;
                } 
                this._drawPath(elem);
            }
        
        });

        if(this.isPath) this.Paint.closePath();

        this.Paint.restore();

        return this;
    }

    setStyle(...styleList){
        // this._describList.push()
        styleList.forEach((style)=>{
            if(style == null) return false;
            this._describList.push({type:'style',styleList:style.styleList()});
        });
        return this;
    }

    /**
     *  解析对象来进行样式绘画
     * @param {*style} css 
     */
    style(css){

        if((typeof css=='string')&&css.constructor==String){
            this.parseStyleforString(css);
        }

        if((typeof css=='object')&&css.constructor==Object){
            this.parseStyleforObject(css);
        }
        this.setStyle(this.ink,this.shadow,this.strokes);
    }

    parseStyleforString(css){
        try{
            this.parseStyleforObject(JSON.parse(css));
        }catch(e){
            console.log('cssString JSON 解析失败');
        }
    }

    parseStyleforObject(css){
        for (const style in css) {

            if(this.inkArr.includes(style)){
                if(this.ink == null){
                    this.ink = new BInk();
                }
                this.ink[style](css[style]);
            }
            if(this.shadowArr.includes(style)){
                if(this.shadow == null){
                    this.shadow = new BShadow();
                }
                this.shadow[style](css[style]);
            }
            if(this.strokesArr.includes(style)){
                if(this.strokes ==null){
                    this.strokes = new BStrokes();
                }
                this.strokes[style](css[style]);
            }
        }
    }

    pushDesc(action,params){
        this._describList.push({type:'draw',action:action,params:params});
    }

    pushDescPath(action,params){
        this.isPath = true;
        this._describList.push({type:'path',action:action,params:params});
    }

    _drawStyle(elem){
        elem.styleList.forEach((elem) => {
            switch(elem.style){
                case 'strokeStyle':
                    this.Paint.strokeStyle(elem.styleParames[0]);
                break;
                case 'fillStyle':
                    this.Paint.fillStyle(elem.styleParames[0]);
                break;
                case 'setGlobalAlpha':
                    this.Paint.setGlobalAlpha(elem.styleParames[0]);
                break;
                case 'lineCap':
                    this.Paint.lineCap(elem.styleParames[0]);
                break;
                case 'lineJoin':
                    this.Paint.lineJoin(elem.styleParames[0]);
                break;
                case 'lineWidth':
                    this.Paint.lineWidth(elem.styleParames[0]);
                break;
                case 'miterLimit':
                    this.Paint.miterLimit(elem.styleParames[0]);
                break;
                case 'setLineDash':
                    this.Paint.setLineDash(elem.styleParames[0]);
                break;
                case 'lineDasgOffset':
                    this.Paint.lineDasgOffset(elem.styleParames[0]);
                break;

                case 'setShadow':
                    this.Paint.setShadow(elem.styleParames[0],elem.styleParames[1],elem.styleParames[2],elem.styleParames[3]);
                break;
            }
        });
    }

    _drawImagePaint(elem){
        switch(elem.action){
            case 'drawImage':
                this.Paint.drawImage(elem.params[0],elem.params[1],elem.params[2],elem.params[3],elem.params[4]);
            break;
            case 'drawImageCut':
                this.Paint.drawImage(
                    elem.params[0],
                    elem.params[1],
                    elem.params[2],
                    elem.params[3],
                    elem.params[4],
                    elem.params[5],
                    elem.params[6],
                    elem.params[7],
                    elem.params[8]
                );
            break;
        }
    }

    _drawText(elem){
        switch(elem.action){
            case 'font':
                this.Paint.font(elem.params[0]);
            break;
            case 'textAlign':
                this.Paint.textAlign(elem.params[0]);
            break;
            case 'textBaseline':
                this.Paint.textBaseline(elem.params[0]);
            break;
            case 'fillText':
                this.Paint.fillText(elem.params[0],elem.params[1],elem.params[2],elem.params[3]);
            break;
            case 'direction':
                this.Paint.direction(elem.params[0]);
            break;
            case 'strokeText':
                this.Paint.strokeText(elem.params[0],elem.params[1],elem.params[2],elem.params[3]);
            break;
            case 'measureText':
                this.Paint.measureText();
            break;
        }
    }

    _drawPath(elem){
        switch(elem.action) {
            case 'line':
                this.Paint.moveTo(elem.params[0][0],elem.params[0][1]);
                this.Paint.lineTo(elem.params[1][0],elem.params[1][1]);
                break;
            case 'bezier':
                if(posArr.length > 1){

                }
                break;
            case 'arc':
                this.Paint.arc(elem.params[0],elem.params[1],elem.params[2],elem.params[3],elem.params[4],elem.params[5]);
                break;
            case 'arcTo':
                this.Paint.arcTo(elem.params[0],elem.params[1],elem.params[2],elem.params[3],elem.params[4]);
                break;
            case 'rect':
                this.Paint.rect(elem.params[0],elem.params[1],elem.params[2],elem.params[3]);
                break;
            case  'polygon':
                this.Paint.moveTo(elem.params[0][0].x(),elem.params[0][0].y());
                for (let i=1;i<elem.params[0].length;i++){
                    this.Paint.lineTo(elem.params[0][i].x(),elem.params[0][i].y());
                }
                this.Paint.lineTo(elem.params[0][0].x(),elem.params[0][0].y());
                //
                break;
            case 'fill':
                this.Paint.fill();
                break;
                
            case 'stroke':
                this.Paint.stroke();
                break;
        }
    }

}
export default BDisplay;