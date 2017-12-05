
class BPaint {

    constructor(context){
        this.context = context;
    }

    static from(context){
        if(BPaint.instances == null)
            BPaint.instances = new BPaint(context);
        return BPaint.instances;
    }

    //墨水设置
    setColor(color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
    };

    setGlobalAlpha(gAlpha) {
        this.context.globalAlpha =  gAlpha;
    };


    //---------------------路径绘图----------------------------
    stroke(){
        return this.context.stroke();
    };
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
    lineTo(){
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
    bezierCurveTo(){
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
    //如果指定的点位于当前路径中，则返回 true，否则返回 false
    isPointInPath(){
        return this.context.isPointInPath(x,y);
    };

    //-------------------------------直接绘图-----------------------------------
    rect(x,y,w,h){
        return this.context.rect(x,y,w,h);
    };
    //绘制“被填充”的矩形
    fillRect(x,y,w,h){
        return this.context.fillRect(x,y,w,h);
    };
    //绘制矩形（无填充）
    strokeRect(x,y,w,h){
        return this.context.strokeRect(x,y,w,h);
    };
    //在给定的矩形内清除指定的像素
    clearRect(x,y,w,h){
        return this.context.clearRect(x,y,w,h);
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
    setLineDash (val) {
        this.context.setLineDash(val);
    };
    getLineDash () {
        return this.context.getLineDash();
    };
    lineDasgOffset (val) {
        this.context.lineDasgOffset = val;
    };
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
        this.context.drawImage(elem,x,y,w,h);
    };
    drawImageCut(elem,sx,sy,swidth,sheight,x,y,width,height){
        this.context.drawImage(elem,sx,sy,swidth,sheight,x,y,width,height);
    };

    //----------------------------数据截取--------------------------------------
    createImageData(){
        return this.context.createImageData(sw,sh);
    };
    getImageData(){
        return this.context.getImageData(sx,sy,sw,sh);
    };
    putImageData(){
        return this.context.putImageData(data,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    };
}

export default BPaint;