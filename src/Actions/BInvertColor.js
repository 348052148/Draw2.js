import BAction from './BAction.js'
import BPaint from '../Base/BPaint.js'
class BInvertColor extends BAction{

    executed(obj,context){

        let Paint = BPaint.from(context);

        let canvasData = Paint.getImageData(obj.x(),obj.y(),obj.width,obj.height);

        // let binaryData = canvasData.data;
        let len = obj.width*obj.height;
        // this.colorAdjustProcess(canvasData.data,len );

        for (let i = 0; i < len; i += 4) {
            let r = canvasData.data[i];
            let g = canvasData.data[i + 1];
            let b = canvasData.data[i + 2];
            canvasData.data[i] = 255-r;
            canvasData.data[i + 1] = 255-g;
            canvasData.data[i + 2] = 255-b;
        }

        context.putImageData(canvasData, 0, 0);
    }

    colorInvertProcess(binaryData, l){
        for (let i = 0; i < l; i += 4) {
            let r = binaryData[i];
            let g = binaryData[i + 1];
            let b = binaryData[i + 2];
            binaryData[i] = 255-r;
            binaryData[i + 1] = 255-g;
            binaryData[i + 2] = 255-b;
        }
    }

    colorAdjustProcess(binaryData, l) {
        for (let i = 0; i < l; i += 4) {
            let r = binaryData[i];
            let g = binaryData[i + 1];
            let b = binaryData[i + 2];

            binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131);
            binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
            binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        }
    }

    blurProcess(context, canvasData) {
        console.log("Canvas Filter - blur process");
        let tempCanvasData = this.copyImageData(context, canvasData);
        let sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
        for ( let x = 0; x < tempCanvasData.width; x++) {
            for ( let y = 0; y < tempCanvasData.height; y++) {

                // Index of the pixel in the array
                let idx = (x + y * tempCanvasData.width) * 4;
                for(let subCol=-2; subCol<=2; subCol++) {
                    let colOff = subCol + x;
                    if(colOff <0 || colOff >= tempCanvasData.width) {
                        colOff = 0;
                    }
                    for(let subRow=-2; subRow<=2; subRow++) {
                        let rowOff = subRow + y;
                        if(rowOff < 0 || rowOff >= tempCanvasData.height) {
                            rowOff = 0;
                        }
                        let idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
                        let r = tempCanvasData.data[idx2 + 0];
                        let g = tempCanvasData.data[idx2 + 1];
                        let b = tempCanvasData.data[idx2 + 2];
                        sumred += r;
                        sumgreen += g;
                        sumblue += b;
                    }
                }

                // calculate new RGB value
                let nr = (sumred / 25.0);
                let ng = (sumgreen / 25.0);
                let nb = (sumblue / 25.0);

                // clear previous for next pixel point
                sumred = 0.0;
                sumgreen = 0.0;
                sumblue = 0.0;

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    }

    reliefProcess(context, canvasData) {
        let tempCanvasData = this.copyImageData(context, canvasData);
        for ( let x = 1; x < tempCanvasData.width-1; x++)
        {
            for ( let y = 1; y < tempCanvasData.height-1; y++)
            {

                // Index of the pixel in the array
                let idx = (x + y * tempCanvasData.width) * 4;
                let bidx = ((x-1) + y * tempCanvasData.width) * 4;
                let aidx = ((x+1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                let nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
                let ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
                let nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    }

    diaokeProcess(context, canvasData) {
        let tempCanvasData = this.copyImageData(context, canvasData);
        for ( let x = 1; x < tempCanvasData.width-1; x++)
        {
            for ( let y = 1; y < tempCanvasData.height-1; y++)
            {

                // Index of the pixel in the array
                let idx = (x + y * tempCanvasData.width) * 4;
                let bidx = ((x-1) + y * tempCanvasData.width) * 4;
                let aidx = ((x+1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                let nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
                let ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
                let nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    }

    mirrorProcess(context, canvasData) {
        let tempCanvasData = this.copyImageData(context, canvasData);
        for ( let x = 0; x < tempCanvasData.width; x++) // column
        {
            for ( let y = 0; y < tempCanvasData.height; y++) // row
            {

                // Index of the pixel in the array
                let idx = (x + y * tempCanvasData.width) * 4;
                let midx = (((tempCanvasData.width -1) - x) + y * tempCanvasData.width) * 4;

                // assign new pixel value
                canvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel
                canvasData.data[midx + 1] = tempCanvasData.data[idx + 1];  // Green channel
                canvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; // Blue channel
                canvasData.data[midx + 3] = 255; // Alpha channel
            }
        }
    }

    copyImageData(context, src)
    {
        let dst = context.createImageData(src.width, src.height);
        dst.data.set(src.data);
        return dst;
    }
}

export default BInvertColor;