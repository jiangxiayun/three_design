
import * as THREE from "three";
import {TEXTURECONFIG, ANIMATIONCONFIG} from "../Config/config"
import {AnimationAction, AnimationSign} from "../Controls/Animation"

const initSysHelpers = Symbol('initSysHelpers');
const animationAction = Symbol('animationAction');

/**
 * 视角类  主要处理页面的render 和一些初始化工作
 * 
 * @class Viewport
 */
class Viewport {

    constructor(designer ,uiSize){
        let scope = this;
        scope.updateQueue = [];

        let scene = designer.scene,
            camera = designer.camera;

        let { width , height} = uiSize;
              
              
        let renderer = new THREE.WebGLRenderer({antialias: true});
 
        designer.renderer = this.renderer = renderer;
        designer.viewport = this;

        // 找到GPU最大有效各向异性值
        TEXTURECONFIG.maxAnisotropy = renderer.getMaxAnisotropy();

        

        renderer.setClearColor(new THREE.Color( 0xffffff));
        renderer.setSize( width, height );

        // renderer.shadowMap.enable = true;
        // renderer.shadowMapEnabled = THREE.PCFSoftShadowMap;

        // 添加helper
        this[initSysHelpers]( scene );

        let step = 1;
        let rotationRad = ANIMATIONCONFIG.rad / ANIMATIONCONFIG.time;

        const render =  () => {
            if(scope.updateQueue.length >0){
                scope.updateQueue.forEach((update) =>{
                    update();
                });
            }

            // 动画——打开门板
            if(designer.animation_open){

                if (step > ANIMATIONCONFIG.time){
                    // 标记状态
                    AnimationSign(designer.animationObject, 'hasOpen');
                    designer.animation_open = false;
                    step = 1;
                }else{
                    AnimationAction(designer.animationObject, rotationRad, step, 'open');
                    step ++;
                }
            }
            // 动画——关闭门板
            if(designer.animation_close){
                if (step > ANIMATIONCONFIG.time){
                    AnimationSign(designer.animationObject, 'hasClose');
                    designer.animation_close = false;
                    step = 1;
                }else{
                    AnimationAction(designer.animationObject, rotationRad, step, 'close');
                    step ++;
                }
            }



            
            requestAnimationFrame(render);
            renderer.render( scene , camera );

        }

        document.body.appendChild( renderer.domElement );
        render();




    }

    /**
     * 添加渲染更新队列
     * 
     * @param {any} updateFn 
     * @memberof Viewport
     */
    addRenderUpdate (updateFn) {
        if( typeof updateFn == 'function'){
            this.updateQueue.push(updateFn)
        }else{
            throw "TypeError, the argument is not a function";
        }
        
    }

    [initSysHelpers](scene){

        let grid = new THREE.GridHelper( 5000, 10 );
        scene.add( grid );

        let axsi = new THREE.AxisHelper(2500);
        scene.add(axsi);
    }






}

export default Viewport;