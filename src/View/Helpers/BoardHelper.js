import * as THREE from "three";
import _ from "lodash";
import  {MeshLine, MeshLineMaterial} from "../../Objects/MeshLine";
import  RulerSet from "../../UI/Ruler.Set";

const lineForSize = new MeshLineMaterial({
    depthTest: false,
    color: new THREE.Color(0xdc1010),
    lineWidth: 10,
    side: THREE.DoubleSide
});
const lineForPosition = new MeshLineMaterial({
    depthTest: false,
    color: new THREE.Color(0x71e321),
    lineWidth: 10,
    side: THREE.DoubleSide
});

const extendDistance = 100;


const reSetRuler = Symbol('reSetRuler');

class BoardHelper {

    constructor(designer, options) {

        // designer.viewport.addRenderUpdate( () =>{
        //
        // })
        // const addRulerHelper = () =>{
        //
        // }


        this.rulers = {};

        {

            this.rulers.lineLength = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMaxY, options.objectMaxZ),
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ),
            ]), lineForSize);


            this.rulers.lineLengthLeft = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMaxY, options.objectMaxZ + extendDistance),
                new THREE.Vector3(options.objectMinX, options.objectMaxY, options.objectMaxZ - extendDistance),
            ]), lineForSize);


            this.rulers.lineLengthRight = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ + extendDistance),
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ - extendDistance),
            ]), lineForSize);


            this.rulers.lineWidth = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMinZ),
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ),
            ]), lineForSize);


            this.rulers.lineWidthLeft = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX - extendDistance, options.objectMaxY, options.objectMaxZ),
                new THREE.Vector3(options.objectMaxX + extendDistance, options.objectMaxY, options.objectMaxZ),
            ]), lineForSize);


            this.rulers.lineWidthRight = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX - extendDistance, options.objectMaxY, options.objectMinZ),
                new THREE.Vector3(options.objectMaxX + extendDistance, options.objectMaxY, options.objectMinZ),
            ]), lineForSize);


            this.rulers.lineDeepth = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX, options.objectMinY, options.objectMaxZ),
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ),
            ]), lineForSize);


            this.rulers.lineDeepthLeft = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX, options.objectMinY, options.objectMaxZ - extendDistance),
                new THREE.Vector3(options.objectMaxX, options.objectMinY, options.objectMaxZ + extendDistance),
            ]), lineForSize);


            this.rulers.lineDeepthRight = makeLine(addLine([
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ - extendDistance),
                new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMaxZ + extendDistance),
            ]), lineForSize);
        }

        {

            this.rulers.linePX = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ),
                new THREE.Vector3(0, options.objectMinY, options.objectMinZ),
            ]), lineForPosition);


            this.rulers.linePXLeft = makeLine(addLine([
                new THREE.Vector3(0, options.objectMinY, options.objectMinZ - extendDistance),
                new THREE.Vector3(0, options.objectMinY, options.objectMinZ + extendDistance),
            ]), lineForPosition);


            this.rulers.linePXRight = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ - extendDistance),
                new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ + extendDistance),
            ]), lineForPosition);

            if (options.objectMinX == 0) {
                this.rulers.linePX.visible = false;
                this.rulers.linePXLeft.visible = false;
                this.rulers.linePXRight.visible = false;
            }




            this.rulers.linePY = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ),
                new THREE.Vector3(options.objectMinX, 0, options.objectMinZ),
            ]), lineForPosition);


            this.rulers.linePYLeft = makeLine(addLine([
                new THREE.Vector3(options.objectMinX - extendDistance, 0, options.objectMinZ),
                new THREE.Vector3(options.objectMinX + extendDistance, 0, options.objectMinZ),
            ]), lineForPosition);


            this.rulers.linePYRight = makeLine(addLine([
                new THREE.Vector3(options.objectMinX - extendDistance, options.objectMinY, options.objectMinZ),
                new THREE.Vector3(options.objectMinX + extendDistance, options.objectMinY, options.objectMinZ),
            ]), lineForPosition);

            if (options.objectMinY == 0) {
                this.rulers.linePY.visible = false;
                this.rulers.linePYLeft.visible = false;
                this.rulers.linePYRight.visible = false;
            }


            this.rulers.linePZ = makeLine(addLine([
                new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ),
                new THREE.Vector3(options.objectMinX, options.objectMinY, 0),
            ]), lineForPosition);


            this.rulers.linePZLeft = makeLine(addLine([
                new THREE.Vector3(options.objectMinX - extendDistance, options.objectMinY, 0),
                new THREE.Vector3(options.objectMinX + extendDistance, options.objectMinY, 0),
            ]), lineForPosition);


            this.rulers.linePZRight = makeLine(addLine([
                new THREE.Vector3(options.objectMinX - extendDistance, options.objectMinY, options.objectMinZ),
                new THREE.Vector3(options.objectMinX + extendDistance, options.objectMinY, options.objectMinZ),
            ]), lineForPosition);

            if (options.objectMinZ == 0) {
                this.rulers.linePZ.visible = false;
                this.rulers.linePZLeft.visible = false;
                this.rulers.linePZRight.visible = false;
            }
        }


        // new RulerSet 插入 input 元素
        this.camera = designer.camera;
        this.designer = designer;
        this.readyForInput(options);



        function makeLine(geo, material) {
            let g = new MeshLine();
            g.setGeometry(geo);

            let mesh = new THREE.Mesh(g.geometry, material);
            return mesh;
        }

        function addLine(vertices) {
            let geo = new THREE.Geometry();
            geo.vertices = vertices;
            return geo
        }


    }

    joinScene(scene) {
        _.forIn(this.rulers, (ruler) => {

            scene.add(ruler);
        })

    }

    reSetSize(options) {
        this[reSetRuler](options);
        this.readyForInput(options);
    }

    transformVertices(g) {
        let positions = [];
        if (g instanceof Float32Array || g instanceof Array) {
            for (var j = 0; j < g.length; j += 3) {
                positions.push(g[j], g[j + 1], g[j + 2]);
                positions.push(g[j], g[j + 1], g[j + 2]);
            }
        }
        return positions
    }

    [reSetRuler](options) {

        let {
            lineLength,
            lineLengthLeft,
            lineLengthRight,
            lineWidth,
            lineWidthLeft,
            lineWidthRight,
            lineDeepth,
            lineDeepthLeft,
            lineDeepthRight,
            linePX,
            linePXLeft,
            linePXRight,
            linePY,
            linePYLeft,
            linePYRight,
            linePZ,
            linePZLeft,
            linePZRight,

        } = this.rulers;

        let lengthX = options.objectMaxX - options.objectMinX;
        let lengthY = options.objectMaxY - options.objectMinY;
        let lengthZ = options.objectMaxZ - options.objectMinZ;

        {

            lineLength.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMinX, options.objectMaxY, options.objectMaxZ,
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ,
                ]), 3));
            lineLengthLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMinX, options.objectMaxY, options.objectMaxZ + extendDistance,
                    options.objectMinX, options.objectMaxY, options.objectMaxZ - extendDistance
                ]), 3));

            lineLengthRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ + extendDistance,
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ - extendDistance
                ]), 3));

            lineWidth.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX, options.objectMaxY, options.objectMinZ,
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ
                ]), 3));
            lineWidthLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX - extendDistance, options.objectMaxY, options.objectMaxZ,
                    options.objectMaxX + extendDistance, options.objectMaxY, options.objectMaxZ
                ]), 3));
            lineWidthRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX - extendDistance, options.objectMaxY, options.objectMinZ,
                    options.objectMaxX + extendDistance, options.objectMaxY, options.objectMinZ
                ]), 3));

            lineDeepth.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX, options.objectMinY, options.objectMaxZ,
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ
                ]), 3));
            lineDeepthLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX, options.objectMinY, options.objectMaxZ - extendDistance,
                    options.objectMaxX, options.objectMinY, options.objectMaxZ + extendDistance
                ]), 3));
            lineDeepthRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                this.transformVertices([
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ - extendDistance,
                    options.objectMaxX, options.objectMaxY, options.objectMaxZ + extendDistance
                ]), 3));

            lineLength.visible = true;
            lineLengthLeft.visible = true;
            lineLengthRight.visible = true;
            lineWidth.visible = true;
            lineWidthLeft.visible = true;
            lineWidthRight.visible = true;
            lineDeepth.visible = true;
            lineDeepthLeft.visible = true;
            lineDeepthRight.visible = true;

        }

        {
            if (options.objectMinX == 0) {
                linePX.visible = false;
                linePXLeft.visible = false;
                linePXRight.visible = false;
            } else {
                linePX.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX, options.objectMinY, options.objectMinZ,
                        0, options.objectMinY, options.objectMinZ
                    ]), 3));
                linePXLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        0, options.objectMinY, options.objectMinZ - extendDistance,
                        0, options.objectMinY, options.objectMinZ + extendDistance
                    ]), 3));
                linePXRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX, options.objectMinY, options.objectMinZ - extendDistance,
                        options.objectMinX, options.objectMinY, options.objectMinZ + extendDistance
                    ]), 3));

                linePX.visible = true;
                linePXLeft.visible = true;
                linePXRight.visible = true;
            }

            if (options.objectMinY == 0) {
                linePY.visible = false;
                linePYLeft.visible = false;
                linePYRight.visible = false;
            } else {
                linePY.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX, options.objectMinY, options.objectMinZ,
                        options.objectMinX, 0, options.objectMinZ
                    ]), 3));
                linePYLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX - extendDistance, 0, options.objectMinZ,
                        options.objectMinX + extendDistance, 0, options.objectMinZ
                    ]), 3));
                linePYRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX - extendDistance, options.objectMinY, options.objectMinZ,
                        options.objectMinX + extendDistance, options.objectMinY, options.objectMinZ
                    ]), 3));

                linePY.visible = true;
                linePYLeft.visible = true;
                linePYRight.visible = true;
            }




            if (options.objectMinZ == 0) {
                linePZ.visible = false;
                linePZLeft.visible = false;
                linePZRight.visible = false;
            } else {
                linePZ.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX, options.objectMinY, options.objectMinZ,
                        options.objectMinX, options.objectMinY, 0
                    ]), 3));
                linePZLeft.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX - extendDistance, options.objectMinY, 0,
                        options.objectMinX + extendDistance, options.objectMinY, 0
                    ]), 3));
                linePZRight.geometry.addAttribute('position', new THREE.Float32BufferAttribute(
                    this.transformVertices([
                        options.objectMinX - extendDistance, options.objectMinY, options.objectMinZ,
                        options.objectMinX + extendDistance, options.objectMinY, options.objectMinZ
                    ]), 3));

                linePZ.visible = true;
                linePZLeft.visible = true;
                linePZRight.visible = true;
            }
        }



    }

    readyForInput (options) {


        let lengthX = options.objectMaxX - options.objectMinX;
        let lengthY = options.objectMaxY - options.objectMinY;
        let lengthZ = options.objectMaxZ - options.objectMinZ;
        let above = 50;

        let inputObjects = {};
        if(lengthX >0){
            inputObjects.SX = [new THREE.Vector3(options.objectMinX + lengthX / 2, options.objectMaxY, options.objectMaxZ), lengthX]
        }
        if(lengthY >0){
            inputObjects.SY = [new THREE.Vector3(options.objectMaxX, options.objectMinY + lengthY / 2, options.objectMaxZ), lengthY]
        }
        if(lengthZ >0){
            inputObjects.SZ = [new THREE.Vector3(options.objectMaxX, options.objectMaxY, options.objectMinZ + lengthZ / 2), lengthZ]
        }
        if(options.objectMinX !=0){
            inputObjects.PX = [new THREE.Vector3(options.objectMinX / 2, options.objectMinY, options.objectMinZ), options.objectMinX]
        }
        if(options.objectMinY !=0){
            inputObjects.PY =  [new THREE.Vector3(options.objectMinX, options.objectMinY / 2, options.objectMinZ), options.objectMinY]
        }
        if(options.objectMinZ !=0){
            inputObjects.PZ = [new THREE.Vector3(options.objectMinX, options.objectMinY, options.objectMinZ / 2), options.objectMinZ]
        }


        this.rulerSet = new RulerSet(this.designer, inputObjects);
    }

    hideRulers () {

        _.forIn( this.rulers , ( ruler) =>{
            ruler.visible = false
        });

        this.rulerSet.clearRulers()
    }
}

export default BoardHelper;