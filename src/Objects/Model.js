
import * as THREE from "three";
import _ from "lodash";

const MODEL_FACE_DEPTH = 5;

export const FaceType = {
    BOTTOM : 'BOTTOM',
    TOP : 'TOP',
    FRONT : 'FRONT',
    BACK : 'BACK',
    LEFT : 'LEFT',
    RIGHT : 'RIGHT'
}

export const BoardType = {
    HORIZONTAL : "HORIZONTAL",
    VERTICAL : "VERTICAL" ,
    SIDE : "SIDE"
}



/**
 * 定义模型对象，用来作为产品的设计范围区域
 *   长方体
 * @class Model
 */
const setFacesSize = Symbol('setFacesSize');
const createModelFaces = Symbol('createModelFaces');
class Model {

    constructor (options ) {

       
        this.initSize = options.size;
        this.size = options.size ; 
        this.name = options.name ;

        this.faces = {} ;
        this.materialOptions = options.materialOptions || {
            color: 0x00ff00,
            opacity :0.2,
            transparent:true
        }


        this[createModelFaces]();
    }
    /**
     * 根据尺寸创建6个模型平面
     * 
     */
    [createModelFaces](){

        let size = this.size;

        /**
         * 创建模型材料
         * 
         */
        const createMaterial = () => new THREE.MeshBasicMaterial( this.materialOptions );


        for (let index = 0; index <   Object.keys(FaceType).length; index++) {

            let faceType = FaceType[Object.keys(FaceType)[index]];
            let mesh = null ;
            switch (faceType){

                case FaceType.BOTTOM :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry ( 1,1,1 ) ,createMaterial()  ) ; 

                    mesh.scale.set(size.width ,size.depth ,MODEL_FACE_DEPTH);
                    mesh.rotation.x = Math.PI / 2 ;

                    mesh.position.x = size.width / 2;
                    mesh.position.y = MODEL_FACE_DEPTH / 2;
                    mesh.position.z = size.depth / 2;

                    mesh.boardType = BoardType.HORIZONTAL;
                    
                    this.faces.bottomFace = mesh;
                    break;
                case FaceType.TOP :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry ( 1,1,1 ) ,createMaterial()  ) ; 

                    mesh.scale.set(size.width ,size.depth ,MODEL_FACE_DEPTH);
                    mesh.rotation.x = Math.PI / 2 ;

                    mesh.position.x = size.width / 2;
                    mesh.position.y = size.height  - MODEL_FACE_DEPTH / 2;
                    mesh.position.z = size.depth / 2;

                    mesh.boardType = BoardType.HORIZONTAL;
                    
                    this.faces.topFace = mesh;
                    break;
                case FaceType.BACK :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry ( 1,1,1 ) ,createMaterial()  ) ; 

                    mesh.scale.set(size.width ,size.height ,MODEL_FACE_DEPTH);
                    //  mesh.rotation.x = Math.PI / 2 ;

                    mesh.position.x = size.width / 2;
                    mesh.position.y = size.height / 2;
                    mesh.position.z = MODEL_FACE_DEPTH / 2;

                    mesh.boardType = BoardType.VERTICAL;
                    

                    this.faces.backFace = mesh;
                    break;
                case FaceType.FRONT :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry (1,1,1  ) ,createMaterial()  ) ; 

                    mesh.scale.set(size.width ,size.height ,MODEL_FACE_DEPTH);
                    //  mesh.rotation.x = Math.PI / 2 ;

                    mesh.position.x = size.width / 2;
                    mesh.position.y = size.height / 2;
                    mesh.position.z = size.depth - MODEL_FACE_DEPTH / 2;

                    mesh.boardType = BoardType.VERTICAL;
                    

                    this.faces.frontFace = mesh;
                    break;
                case FaceType.LEFT :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry ( 1,1,1) ,createMaterial()  ) ; 

                    mesh.scale.set( size.depth ,size.height ,MODEL_FACE_DEPTH);
                    mesh.rotation.y = Math.PI / 2 ;

                    mesh.position.x = MODEL_FACE_DEPTH / 2 ;
                    mesh.position.y = size.height / 2;
                    mesh.position.z = size.depth / 2;

                    mesh.boardType = BoardType.SIDE;
                    

                    this.faces.leftFace = mesh;
                    break;
                case FaceType.RIGHT :
                    mesh = new THREE.Mesh(  new THREE.BoxGeometry ( 1,1,1 ) ,createMaterial() ) ; 

                    mesh.scale.set(size.width ,size.height ,MODEL_FACE_DEPTH);
                    mesh.rotation.y = Math.PI / 2 ;

                    mesh.position.x = size.width - MODEL_FACE_DEPTH / 2;
                    mesh.position.y = size.height / 2;
                    mesh.position.z = size.depth / 2;


                    mesh.boardType = BoardType.SIDE;
                    
                    this.faces.rightFace = mesh;
                    break;

            }
            mesh.updateMatrix();
            mesh.name = "model_" + faceType;

        }
    }

    joinScene (scene) {

        _.forIn( this.faces , ( face,faceName) =>{
            scene.add (face);
        })
    }

    changeModel (name ,size) {
        this.name = name ;
        this.setSize(size);
    }

    setSize(size) {

        // 先修改
        this[setFacesSize](size);

        // 后重新赋值
        this.size = size;

    }

  
    [setFacesSize](newSize){  

        let calcWidth = getNumber(boardData.size.width) * Math.cos ( object.rotation.y ) * Math.cos ( object.rotation.z )
                        + getNumber(boardData.size.height) * Math.sin ( object.rotation.z )
                        + getNumber(boardData.size.depth) * Math.sin ( object.rotation.y ) ;

        let calcHeight = getNumber(boardData.size.height) * Math.cos ( object.rotation.x ) * Math.cos ( object.rotation.z )
                        + getNumber(boardData.size.width) * Math.sin ( object.rotation.z )
                        + getNumber(boardData.size.depth) * Math.sin ( object.rotation.x ) ;

        let calcDepth = getNumber(boardData.size.depth) * Math.cos ( object.rotation.y ) * Math.cos ( object.rotation.x )
                        + getNumber(boardData.size.height) * Math.sin ( object.rotation.x )
                        + getNumber(boardData.size.width) * Math.sin ( object.rotation.y ) ;
        
        let {

            bottomFace,
            // topFace,
            // leftFace,
            // rightFace,
            // backFace,
            // frontFace
        } = this.faces;

        console.log()
        let scaleX = newSize.width ,
            scaleY = newSize.height  ,
            scaleZ = newSize.depth  ;
        
        let newPosition = {
            x : newSize.width / 2 ,
            y : newSize.height / 2 ,
            z : newSize.depth / 2
        }

        // bottomFace.scale.x = scaleX ;
        bottomFace.scale.z = scaleZ ;
        // bottomFace.position.x = newPosition.x;
        // bottomFace.position.z = newPosition.z;
        bottomFace.updateMatrix();

        // topFace.scale.x = scaleX ;
        // topFace.scale.z = scaleZ ;
        // topFace.position.x = newPosition.x;
        // topFace.position.y = newSize.height - MODEL_FACE_DEPTH / 2;
        // topFace.position.z = newPosition.z;
        // topFace.updateMatrix();
        
        // leftFace.scale.z = scaleZ ;
        // leftFace.scale.y = scaleY ;
        // leftFace.position.y = newPosition.y;
        // leftFace.position.z = newPosition.z;
        // leftFace.updateMatrix();

        // rightFace.scale.z = scaleZ ;
        // rightFace.scale.y = scaleY ;
        // rightFace.position.x = newSize.width - MODEL_FACE_DEPTH / 2;
        // rightFace.position.y = newPosition.y;
        // rightFace.position.z = newPosition.z;
        // rightFace.updateMatrix();

        
        // backFace.scale.x = scaleX ;
        // backFace.scale.y = scaleY ;
        // backFace.position.y = newPosition.y;
        // backFace.position.x = newPosition.x; 
        // backFace.updateMatrix();

        // frontFace.scale.x = scaleX ;
        // frontFace.scale.y = scaleY ;
        // frontFace.position.y = newPosition.y;
        // frontFace.position.z = newSize.depth - MODEL_FACE_DEPTH / 2;
        // frontFace.position.x = newPosition.x;
        // frontFace.updateMatrix();
        

    }

}


export default Model ; 