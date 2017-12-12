/**
 * 工具类。提供一些静态函数用于处理计算
 */
class BUtils {

    static uuid(){
        this.S4=() => {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    }

    static rayCasting(p, poly) {
        var px = p.x,
            py = p.y,
            flag = false;

        for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].x,
                sy = poly[i].y,
                tx = poly[j].x,
                ty = poly[j].y;

            // 点与多边形顶点重合
            if((sx === px && sy === py) || (tx === px && ty === py)) {
                return 'on'
            }

            // 判断线段两端点是否在射线两侧
            if((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 Y 坐标相同的点的 X 坐标
                var x = sx + (py - sy) * (tx - sx) / (ty - sy);

                // 点在多边形的边上
                if(x === px) {
                    return 'on'
                }

                // 射线穿过多边形的边界
                if(x > px) {
                    flag = !flag
                }
            }
        }

        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? 'in' : 'out';
    }
    static rectPos (x,y,width,height) {
        var ploye = [
            {x:x,y:y},
            {x:x,y:y+height},
            {x:x+width,y:y+height},
            {x:x+width,y:y}
        ];
        return ploye;
    }
    static matrix2rect (matrix) {
        var ploye = [];
        for(var i=0;i<matrix.length;i++){
            ploye.push({x:matrix[i][0],y:matrix[i][1]});
        }
        return ploye;
    }
    static polygonPos (position_arr) {
        ploye = [];
        for (pos in position_arr){
            ploye.push({x:pos[0],y:pos[1]});
        }
        return ploye;
    }

}

export default BUtils;