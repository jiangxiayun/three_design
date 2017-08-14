
import BoardControls from "./BoardControls";
import ModelControls from "./ModelControls";
import OrbitControls from "./OrbitControls";
import TransformControls from "./TransformControls";

class Controls {

    constructor(designer){
        let camera = designer.camera,
            scene = designer.scene ,
            renderer = designer.renderer,
            domElement = renderer.domElement;


        let orbitControls = new OrbitControls(camera , domElement) ;
        orbitControls.minDistance = 500;  // 最近距离
        orbitControls.maxDistance = 15000; // 最远距离


        // 标记状态，是否在改变视图角度
        // 发现如果放在 render里面 ，滚轮缩放的时候，可能速度太快，遗失帧
        orbitControls.addEventListener('change', function (event) {

            // designer.orbitChange = true

            // 更新 input 位置
            if(designer.GLOBAL_CONFIG.showRuler && designer.currentRuler){
                designer.currentRuler.readyForInput(designer.rulerOPtions);
            }

        });
        // orbitControls.addEventListener('end', function (event) {
        //     // console.log('end')
        //     designer.orbitChange = false
        // });

        new BoardControls(designer);
        new ModelControls(designer);
    }

}

export default Controls;