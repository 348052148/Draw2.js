import BObject from './BObject.js'
class BPaint  extends BObject{

    constructor(context){
        super();
        this.context = context;
    }

    static from(context){
        if(BPaint.instances == null)
            BPaint.instances = new BPaint(context);
        return BPaint.instances;
    }

    //----------------------------样式设置-----------------------------------------
    //墨水设置
    setColor(color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
    };

    //设置透明度
    setGlobalAlpha(gAlpha) {
        this.context.globalAlpha =  gAlpha;
    };

    //-----------------------------笔触设置--------------------------------------------
    //设置或返回线条的结束端点样式
    lineCap(val){
        this.context.lineCap=val;
    };
    //设置或返回两条线相交时，所创建的拐角类型
    lineJoin(val){
        this.context.lineJoin=val;
    };
    //设置或返回当前的线条宽度
    lineWidth(val){
        this.context.lineWidth=val;
    };
    //设置或返回最大斜接长度
    miterLimit(val){
        this.context.miterLimit=val;
    };
    //设置当前虚线样式
    setLineDash (val) {
        this.context.setLineDash(val);
    };
    getLineDash () {
        return this.context.getLineDash();
    };
    //设置虚线样式的起始偏移量
    lineDasgOffset (val) {
        this.context.lineDasgOffset = val;
    };

    //-----------------------渐变设置---------------------------
    //ctx.fillStyle = radgrad4; 渐变作为样式传入
    // 创建线性渐变
    createLinearGradient(x1, y1, x2, y2){
        return this.createLinearGradient(x1,y1,x2,y2);
    }
    // 创建环型渐变
    createRadialGradient(x1, y1, r1, x2, y2, r2){
        return this.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    // 渐变节点配置
    addColorStop(gradient,pos,color){
        return gradient.addColorStop(pos,color);
    }
    // ctx.fillStyle = ptrn; 以图片创建填充样式
    createPattern(image, type){
        return this.context.createPattern(image,type);
    }

    //----------------------阴影处理----------------------------

    //shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。
    //负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
    shadowOffsetX(val){
        this.shadowOffsetX = val;
    }
    //shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
    shadowOffsetY(val){
        this.shadowOffsetY = val;
    }

    //---------------------路径绘图----------------------------
    stroke(){
        return this.context.stroke();
    };
    fill(){
        return this.context.fill();
    }
    //起始一条路径，或重置当前路径
    beginPath(){
        this.context.beginPath();
    };
    //把路径移动到画布中的指定点，不创建线条
    moveTo(x,y){
        return this.context.moveTo(x,y);
    };
    //创建从当前点回到起始点的路径
    closePath(){
        return this.context.closePath();
    };
    //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    lineTo(x,y){
        this.context.lineTo(x,y);
    };
    //从原始画布剪切任意形状和尺寸的区域
    clip(){
        return this.context.clip();
    };
    //创建二次贝塞尔曲线
    quadraticCurveTo(cpx,xpy,x,y){
        return this.context.quadraticCurveTo(cpx,cpy,x,y);
    };
    //创建三次方贝塞尔曲线
    bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y){
        return this.context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    };
    //创建弧/曲线（用于创建圆形或部分圆）
    arc(x,y,radius,startAnglr,endAngle,antclockwise){
        return this.context.arc(x,y,radius,startAnglr,endAngle,antclockwise);
    };
    //创建两切线之间的弧/曲线
    arcTo(x1,y1,x2,y2,radius){
        return this.context.arcTo(x1,y1,x2,y2,radius);
    };
    rect(x,y,w,h){
        return this.context.rect(x-w/2,y-h/2,w,h);
    };
    //如果指定的点位于当前路径中，则返回 true，否则返回 false
    isPointInPath(x,y){
        return this.context.isPointInPath(x,y);
    };

    //-------------------------------直接绘图-----------------------------------
    //绘制“被填充”的矩形
    fillRect(x,y,w,h){
        // this.context.translate(w/2,h/2);
        return this.context.fillRect(x-w/2,y-h/2,w,h);
        // this.context.translate(-w/2,-h/2);
    };
    //绘制矩形（无填充）
    strokeRect(x,y,w,h){
        // this.context.translate(w/2,h/2);
        return this.context.strokeRect(x-w/2,y-h/2,w,h);
        // this.context.translate(-w/2,-h/2);
    };
    //在给定的矩形内清除指定的像素
    clearRect(x,y,w,h){
        return this.context.clearRect(x,y,w,h);
    }

    //------------------------------书写文字------------------------------------------------
    //设置或返回文本内容的当前字体属性
    font(font){
        this.context.font=font;
    };
    //设置或返回文本内容的当前对齐方式
    textAlign(textAlign){
        this.context.textAlign=textAlign;
    };
    //设置或返回在绘制文本时使用的当前文本基线
    textBaseline(textBaseline){
        this.context.textBaseline=textBaseline;
    };
    //在画布上绘制“被填充的”文本
    fillText(text,x,y,maxWidth){
        return this.context.fillText(text,x,y,maxWidth);
    };
    //文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
    direction (val) {
        this.context.direction = val;
    };
    //在画布上绘制文本（无填充）
    strokeText(text,x,y,maxWidth){
        return this.context.strokeText(text,x,y,maxWidth);
    };
    //返回包含指定文本宽度的对象
    measureText(text){
        return this.context.measureText(text);
    };
    //---------------------------绘制图片------------------------------------------------
    drawImage(elem,x,y,w,h){
        this.context.drawImage(elem,x-w/2,y-h/2,w,h);
    };
    drawImageCut(elem,sx,sy,swidth,sheight,x,y,width,height){
        this.context.drawImage(elem,sx,sy,swidth,sheight,x,y,width,height);
    };

    //----------------------------数据截取--------------------------------------
    createImageData(sw,sh){
        return this.context.createImageData(sw,sh);
    };
    getImageData(sx,sy,sw,sh){
        return this.context.getImageData(sx,sy,sw,sh);
    };
    putImageData(data,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight){
        return this.context.putImageData(data,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    };
}

export default BPaint;