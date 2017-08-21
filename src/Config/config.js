
// 纹理
export const TEXTURECONFIG = {
    maxAnisotropy: null    // 各向异性值
};

// 板材
export const BOARDCONFIG = {
    thickness: 18     // 板厚
};

// 模型
export const MODELCONFIG = {
    MODEL_FACE_DEPTH: 0.2     // 模型平面厚度
};


// 动画
export const ANIMATIONCONFIG = {
    time: 128,     // 动画时间，秒 * 64
    rad: Math.PI / 3  // 翻门弧度 60°
};

// 门板打开方向，板的类型（朝向）不同，对应翻面也不同，
export const DIRECTION = [
    // 翻面
    'turn-up', // 从下往上翻
    'turn-down',
    'turn-left',
    'turn-right',

    // 移门
    'move-left',
    'move-right',
]


export const windowVector = function (camera, dom, vector){

    let projectVector = vector.clone().project(camera); // 三维坐标在摄影机上的投影坐标
    let rect = dom.getBoundingClientRect();  // 返回元素的大小及其相对于视口的位置
    let halfWidth = (rect.width) / 2;
    let halfHeight = (rect.height) / 2;
    let wx = Math.round(projectVector.x * halfWidth + halfWidth) +250;    // 在屏幕上的坐标
    let wy = Math.round(-projectVector.y * halfHeight + halfHeight) +50; // 在屏幕上的坐标

    return {
        wx: wx,
        wy: wy
    }
};

