
class BExplorer{
    constructor(director){
        this.director = director;
        this.IMG = {};
    }

    loadImages (sources,func,callback) {
        let loadedImages = 0;
        let numImages = 0;
        // get num of sources
        for (let src in sources) {
            numImages++;
        }

        for (let src in sources) {

            this.IMG[src] = new Image();

            //图片执行完成
            this.IMG[src].onload = function(){
                //当所有图片加载完成时，执行回调函数callback
                if (++loadedImages >= numImages) {
                    callback();
                }
                //重绘一个进度条
                func(loadedImages,numImages);
            };

            this.IMG[src].src = sources[src];
        }
    }
}

export default BExplorer;