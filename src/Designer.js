
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
        this.animationObject = []; // 存放有打开，关闭动画效果的 mesh

        this.sceneObjects = [];  // 存放所有需要检测的 boards 和 model-faces


        // 历史记录
        this.history = new History();



        this.selectedBoard = null;
        this.currentModel = null;
        this.currentRuler = null;
        this.currentIndex = 0;

        this.optionMode = 'input';


        this.GLOBAL_CONFIG = {
            nearDistance: 50,  // 邻近距离设定(对齐吸附)
            alignSet: false, // 对齐
            addPreviewSet: false, // 预览
            showRuler: false, // 标尺
        }

        this.animation_open = false; // 打开门板动画标记
        this.animation_close = false; // 关闭门板动画标记

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

            GET_CURRENT_RULER : new Signal(),

            HRLPER_ADD_RULER:  new Signal(),
            HRLPER_CHANGE_RULER:  new Signal(),
            HRLPER_HIDE_RULER:  new Signal(),


            LOAD_OBJECT : new Signal(),
            EXPORT_OBJECT : new Signal(),


            READY_INSERT_BOARD : new Signal(),


            SHOW_BOARD_OPTIONS : new Signal(),
            HIDE_BOARD_OPTIONS : new Signal(),


            SCENE_MENU : new Signal(),
            BOARD_MENU : new Signal(),
            REMOVE_SCENE_MENU : new Signal(),


            ANIMATION_RESET : new Signal(),
            TRANSFORM_BOARD_TO_DOOR : new Signal(),
            TRANSFORM_DOOR_TO_DRAWER : new Signal(),
            TRANSFORM_DRAWER_TO_DOOR : new Signal(),
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
        // console.log(this.scene)
        // if(cmd.indexOf('GET') == -1){
        //
        //     this.history.pushState({
        //         cmdName :cmd,
        //         options : options,
        //         scene : this.scene.toJSON()
        //     })
        // }
        //
        // console.log(this.history.getCurrentNode());
 
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

