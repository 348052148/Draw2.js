/**
 * 样式描述类
 */
class BStyle {
    constructor(){
        this._styleCss = [];
    }

    push(styleName,styleParames){
        this._styleCss.push({style:styleName,styleParames:styleParames});
    }

    styleList(){
        return this._styleCss;
    }
}

export default BStyle;