
import Viewport from "./Viewport";

import ModelHelper from "./Helpers/ModelHelper";
import BoardHelper from "./Helpers/BoardHelper";


/**
 * 视图类  负责webgl部分的视图
 * 
 * @class View
 */
class View {
    constructor(designer ,uiSize){
        // 先初始化视图
        new Viewport(designer ,uiSize);


        // 再初始化helper
        // new BoardHelper(designer);
        // new ModelHelper(designer);
    }
}


export default View;