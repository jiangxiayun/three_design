
import * as THREE from "three";


// import OBJExporter from "./Exporters/OBJExporter";

import History from "./Helpers/History.js";

import {Signal} from 'signals.js';
import _ from "lodash";

/**
 * 
 * 设计器类
 * @class Designer
 */
class Designer {

    constructor (areaWidh , areaHeight) {

        this.DEFAULT_CAMERA = new THREE.PerspectiveCamera( 45, areaWidh/ areaHeight, 0.1, 20000 );
        this.DEFAULT_CAMERA.name = 'Camera';
        this.DEFAULT_CAMERA.position.set( 2500, 2500, 3500 );
        this.DEFAULT_CAMERA.lookAt( new THREE.Vector3() );


        this.scene = new THREE.Scene() ;
        this.scene.background =  new THREE.Color( 0xcccccc );
        this.camera = this.DEFAULT_CAMERA;

        this.renderer = null;

        this.boards = [];
        // this.currentFaces = [];
 

        // 历史记录
        this.history = new History();


        this.selectedBoard = null;
        this.currentModel = null;

        this.optionMode = 'input';


        this.cmds = {

            ADD_MODEL : new Signal(),
            CHANGE_MODEL :  new Signal(),
            ADD_BOARD : new Signal(),
            SET_BOARD : new Signal(),
            REMOVE_BOARD : new Signal(),
            CHANGE_MODE : new Signal(),
            SELECT_BOARD : new Signal(),


            GET_CURRENT_MODEL : new Signal(),
            GET_SELECTED_BOARD : new Signal(),
            GET_ALL_BOARD : new Signal(),


            LOAD_OBJECT : new Signal(),
            EXPORT_OBJECT : new Signal()

        }
    }


    /**
     * 执行命令
     * 
     * @param {any} cmd 
     * @param {any} options 
     * @memberof Designer
     */
    execCmd (cmd,options) {


        // 执行命令
        this.cmds[cmd].dispatch(options); 

        // 推入历史栈
        this.history.pushState({

        })
 
    }

    redo () {

        let scene = (this.history.redo()).scene;
        this.setScene(scene);
    }

    undo (){
        
        let scene = (this.history.undo()).scene;
        this.setScene(scene);
    }
    /**
     * 
     * 将当前场景设置成传入的场景数据
     * @param {any} scene 
     * @memberof Designer
     */
    setScene (scene) {

    }


    toJson(data){
    }



    fromJson(json){

    }

}

export default Designer;

