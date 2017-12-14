
import BText from './BText.js'
import BPathGroup from './BPathGroup.js'
import BPath from './BPath.js'
import BImage from './BImage.js'
import BPixel from './BPixel.js'
class BPen {
    constructor(){
        
    }
    static from(){
        if(BPen.instance == null){
            BPen.instance = new BPen();
        }
        return BPen;
    }
    // 绘制文本
    static Text(){
        BPen.from().text = new BText();
        return BPen.from().text;
    }

    static PathGroup(){
        BPen.from().pathGroup = new BPathGroup();
        return BPen.from().pathGroup;
    }

    static Path(){
        BPen.from().path = new BPath();
        return BPen.from().path;
    }

    static Image(){
        BPen.from().iamge = new BImage();
        return BPen.from().iamge;
    }

    static Pixel(){
        BPen.from().pixel = new BPixel();
        return BPen.from().pixel;
    }

}

export default BPen;