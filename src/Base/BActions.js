
class BActions{
    constructor(context){
        this.context = context;
    }
    scale(x,y){
        return this.context.scale(x,y);
    };
    rotate(angle,corePos){
        this.context.translate(corePos.x,corePos.y);
        this.context.rotate(angle);
        this.context.translate(-corePos.x,-corePos.y);
    };
    translate(x,y){

        return this.context.translate(x,y);

    };
    transform(m11,m12,m21,m22,dx,dy){
        return this.context.transform(m11,m12,m21,m22,dx,dy);
    };
    setTransform(m11,m12,m21,m22,dx,dy){
        return this.context.setTransform(m11,m12,m21,m22,dx,dy);
    };
    resetTransform () {
        return this.context.resetTransform();
    };
}

export default BActions;