
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


        new OrbitControls(camera , domElement) ;

        new BoardControls(designer);
        new ModelControls(designer);
    }

}

export default Controls;