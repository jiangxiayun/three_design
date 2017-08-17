import * as THREE from "three";
import { BOARDCONFIG, TEXTURECONFIG, MODELCONFIG } from "../Config/config"


const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xe8c582, transparent: true, opacity: 0.2} );  // 操作区域平面原始材质
const TextureLoader = new THREE.TextureLoader();



class ModelControls {

	constructor(designer){
        let _camera = designer.camera,
            _scene = designer.scene ,
            _renderer = designer.renderer,
            _domElement = _renderer.domElement;

        designer.modelControls = this;
        let scope = this;
        scope.enabled = false;
        scope.startADDING = false;
        scope.cubeForPreview = null;



        let _raycaster = new THREE.Raycaster();
        let _hovered = null, _movingCube = null;
        let _highlightBoxClick, _highlightBoxHover;
        let _selectedPlane = null;   // 鼠标选取的操作区域面，取远处的面
        let _mouse = new THREE.Vector2();
        let onDownPosition = new THREE.Vector2();
        let onUpPosition = new THREE.Vector2();
        let forDomPosition = new THREE.Vector2();

        let hadOrthogonal = [];
        let spaceEnough = true;  // 标记空间容量，true为能添加，false为空间不足无法添加
        let addCubePosition = new THREE.Vector3(); // 新增板材的 position
        let addCubeOptions = {};  // 新增板材的尺寸


		//添加到渲染队列
		designer.viewport.addRenderUpdate( () =>{

			if(designer.currentModel){

			}


		})

		// 添加准备插入板材命令
		designer.cmds.READY_INSERT_BOARD.add ( (options) =>{
			scope.startADDING = true;

			scope.boardOptions = options;
			scope.addType = options.type;

			if(!scope.cubeForPreview && designer.GLOBAL_CONFIG.addPreviewSet){

				let texture = TextureLoader.load( options.img );
				texture.anisotropy = TEXTURECONFIG.maxAnisotropy;
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

				scope.cubeForPreview = new THREE.Mesh(new THREE.BoxGeometry(1, 1,1), new THREE.MeshBasicMaterial({ map: texture }))
				scope.cubeForPreview.visible = false;
				designer.scene.add(scope.cubeForPreview)
			}
		})



        _domElement.addEventListener('mousemove', onMouseMove, false);
        _domElement.addEventListener('mousedown', onMouseDown, false);

        function onMouseMove(event) {

            event.preventDefault();

            if(!scope.enabled) return;

            let array = getMousePosition(_domElement, event.clientX, event.clientY);
            let movePosition = new THREE.Vector2()
            movePosition.fromArray(array);

            handleHove(movePosition)


        }

        function onMouseDown(event) {

            event.preventDefault();

            // 移除弹窗菜单
            if(designer.popup){
                designer.execCmd('REMOVE_SCENE_MENU');
            }

            if(!scope.enabled) return;

            var array = getMousePosition(_domElement, event.clientX, event.clientY);
            onDownPosition.fromArray(array);


            document.addEventListener('mouseup', onMouseUp, false);

        }

        function onMouseUp(event) {

            event.preventDefault();

            if(!scope.enabled) return;



            forDomPosition.set(event.clientX, event.clientY);

            var array = getMousePosition(_domElement, event.clientX, event.clientY);
            onUpPosition.fromArray(array);

            console.log('startADDING',scope.startADDING);
            // 点击鼠标左键添加板材
            if (scope.startADDING && event.button == 0) {

                if (onDownPosition.distanceTo(onUpPosition) === 0) {

                    var intersects = getIntersects(onUpPosition, designer.sceneObjects);

                    if (intersects.length > 0 &&  spaceEnough) {

                        if(!designer.GLOBAL_CONFIG.addPreviewSet){
                            beforeInsertCube(_selectedPlane)
                        }

                        joinBoardToSecen();

                        // appendObjectsList()
                    } else {

                        // cancelAdding()
                        if(!spaceEnough){
                            alert('空间不足')
                        }
                    }

                    scope.startADDING = false;
                    if(scope.cubeForPreview){
                        scope.cubeForPreview.visible = false;
                    }

                }

            } else {
                handleClick(event);
            }


            document.removeEventListener('mouseup', onMouseUp, false);

        }

        function handleClick(event) {

            // 当点击过程中鼠标无移动的情况下，避免移动、旋转场景事件混乱
            if (onDownPosition.distanceTo(onUpPosition) === 0) {

                var intersects = getIntersects(onUpPosition, designer.sceneObjects);

                if (intersects.length > 0) {

                    // 标记当前位置是否有板材；
                    let hasBorad = false;

                    for(let i in intersects){

                        if(!intersects[i].object.isModelFace && intersects[i].object.geometry instanceof THREE.BoxGeometry){

                            hasBorad = true;

                            if(designer.selectedBoard != intersects[i].object){

                                let object = intersects[i].object;

                                designer.selectedBoard = object;
                                addHightBox(designer.selectedBoard,'Click');

                                // 显示标尺
                                if(designer.GLOBAL_CONFIG.showRuler){

                                    let geoVerticesTure = getGeometrySizeOptions(object);


                                    // 判断当前是否有模型，没有则添加，有则转换
                                    designer.execCmd('GET_CURRENT_RULER', currentRuler =>{
                                        if(currentRuler){
                                            designer.execCmd('HRLPER_CHANGE_RULER',geoVerticesTure);
                                        }else{
                                            designer.execCmd('HRLPER_ADD_RULER',geoVerticesTure);
                                        }

                                    });

                                }

                                // 标记面板 list 选择状态
                                // signCubeList(object)
                            }

                            break
                        }
                        designer.selectedBoard = null;
                        deleteHelps('Click');
                        // deleteMeshSetPlane()


                    }

                    if(event.button == 2){
                        if(hasBorad){
                            // 右键板材设置弹窗
                            designer.execCmd('BOARD_MENU', forDomPosition);
                        }else{
                            // 右键全局场景弹窗
                            designer.execCmd('SCENE_MENU', forDomPosition);
                        }
                    }


                } else {

                    designer.selectedBoard = null;
                    deleteHelps('Click');
                    // deleteMeshSetPlane()

                    // 右键全局场景弹窗
                    if(event.button == 2){
                        designer.execCmd('SCENE_MENU', forDomPosition);
                    }else{
                        // 移除弹窗菜单
                        designer.execCmd('REMOVE_SCENE_MENU');
                    }

                }


            }

        }



        function handleHove(point) {

            // 还原平面初始颜色,清除 hightBox 高亮外框
            initPlaneColor()
            deleteHelps()

            _selectedPlane = null;
            _hovered = null;

            let intersects = getIntersects(point, designer.sceneObjects)

            if (intersects.length > 0) {

                // 与射线第一个相交的物体是板面，即选择的是溢出区域的板面 或 拉近时选择的第一个板面
                if (!intersects[0].object.isModelFace) {

                    let object = intersects[0].object
                    _hovered = object

                    addHightBox(_hovered,'Hover')
                    _selectedPlane = intersects[0]
                    return

                }

                // 拉近时射线只穿过1个平面的情况
                if(intersects.length == 1 && intersects[0].object.isModelFace){
                    // 选择的 Plane 变色处理
                    _selectedPlane = intersects[0]
                    updatePlaneColor(_selectedPlane.object)
                    return
                }

                if (intersects[0].object.isModelFace && intersects.length >= 2) {
                    // 选择的是区域内的 object (暂时不考虑有板面在操作区域外的情况)


                    // 该射线上没有区域内的 BoxGeometry，此时选择远处的 Plane
                    if (intersects[1].object.isModelFace) {

                        // 选择的 Plane 变色处理
                        updatePlaneColor(intersects[1].object)

                    } else {
                        // 选择的是区域的板面

                        let object = intersects[1].object
                        _hovered = object

                        addHightBox(_hovered,'Hover')

                    }

                    _selectedPlane = intersects[1]

                }


                // 预览
                if( designer.GLOBAL_CONFIG.addPreviewSet && scope.startADDING){

                    beforeInsertCube(_selectedPlane)

                }

            } else {

                _selectedPlane = null

                if (scope.startADDING && designer.GLOBAL_CONFIG.addPreviewSet) {
                    scope.cubeForPreview.visible = false
                }


            }


        }



        function beforeInsertCube(selectedPlane) {

            if(!selectedPlane) return

            let position = new THREE.Vector3(Math.round(selectedPlane.point.x), Math.round(selectedPlane.point.y), Math.round(selectedPlane.point.z))


            if(designer.GLOBAL_CONFIG.alignSet){

                switch (scope.addType){
                    case 'VERCITAL_BOARD':
                        tobeAalign(position,'z' )
                        break;
                    case 'SIDE_BOARD':
                        tobeAalign(position,'x' )
                        break;
                    case 'HORIZONTAL_BOARD':
                        tobeAalign(position,'y' )
                        break;
                }
            }

            collision(designer.sceneObjects, position, selectedPlane)


        }


        // 检测碰撞计算面积尺寸
        function collision(collisionArray, position, selectedObject) {

            hadOrthogonal = []

            // 获取中心点坐标
            let originPoint = position;
            console.log('position2222', originPoint)

            let cubeFaceType = scope.addType; // 要添加的板材的类型
            let canBuildArea = {};  // 点击处朝6个正交方向可延伸的最大坐标
            let faceNormal = new THREE.Vector3();
            let createBox = designer.GLOBAL_CONFIG.modelSize;
            // console.log('模型尺寸：',createBox)

            /*沿点击面的面向量方向延伸0.1个单位*/
            if( selectedObject.object.isModelFace){

                let mesh = selectedObject.object
                if(mesh.position.x == createBox.width + MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(-0.1,0,0)
                }
                if(mesh.position.x == - MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(0.1,0,0)
                }
                if(mesh.position.y == createBox.height + MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(0,-0.1,0)
                }
                if(mesh.position.y == - MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(0,0.1,0)
                }
                if(mesh.position.z == createBox.depth + MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(0,0,-0.1)
                }
                if(mesh.position.z == - MODELCONFIG.MODEL_FACE_DEPTH / 2){
                    faceNormal.set(0,0,0.1)
                }


            }else{

                let mesh = selectedObject.object
                let geoVerticesTure = getGeometrySizeOptions(mesh)
                console.log('geoVerticesTure',geoVerticesTure)


                // 点在左侧面
                if(originPoint.x == geoVerticesTure.objectMinX){
                    faceNormal.set(-0.1,0,0)
                }
                // 点在右侧面
                if(originPoint.x == geoVerticesTure.objectMaxX){
                    faceNormal.set(0.1,0,0)
                }
                // 点在上侧面
                if(originPoint.y == geoVerticesTure.objectMaxY){
                    faceNormal.set(0,0.1,0)
                }
                // 点在下侧面
                if(originPoint.y == geoVerticesTure.objectMinY){
                    faceNormal.set(0,-0.1,0)
                }
                // 点在前侧面
                if(originPoint.z == geoVerticesTure.objectMaxZ){
                    faceNormal.set(0,0,0.1)
                }
                // 点在后侧面
                if(originPoint.z == geoVerticesTure.objectMinZ){
                    faceNormal.set(0,0,-0.1)
                }
            }

            console.log('faceNormal面向量',faceNormal)
            let rayOrigin = originPoint.clone().add(faceNormal)

            // 沿 X 轴正方向射线
            canBuildArea.maxX = Math.round(rayCollision(rayOrigin,new THREE.Vector3(1,0,0)).x)
            // 沿 X 轴负方向射线
            canBuildArea.minX = Math.round(rayCollision(rayOrigin,new THREE.Vector3(-1,0,0) ).x)
            // 沿 y 轴正方向射线
            canBuildArea.maxY = Math.round(rayCollision(rayOrigin,new THREE.Vector3(0,1,0) ).y)
            // 沿 y 轴负方向射线
            canBuildArea.minY = Math.round(rayCollision(rayOrigin,new THREE.Vector3(0,-1,0) ).y)
            // 沿 z 轴正方向射线
            canBuildArea.maxZ = Math.round(rayCollision(rayOrigin,new THREE.Vector3(0,0,1) ).z)
            // 沿 z 轴负方向射线
            canBuildArea.minZ = Math.round(rayCollision(rayOrigin,new THREE.Vector3(0,0,-1) ).z)


            console.log('canBuildArea:', canBuildArea)
            console.log('hadOrthogonal:', hadOrthogonal)



            let nearMeshAxes = Object.assign({},canBuildArea)

            for(let i=0;i<collisionArray.length;i++){
                // 不再检测之前与6条正交射线相交的物体
                if(hadOrthogonal.indexOf(collisionArray[i]) <= -1){

                    let mesh = collisionArray[i]

                    let geoVerticesTure = getGeometrySizeOptions(mesh);

                    switch (cubeFaceType){
                        case 'VERCITAL_BOARD':
                        {
                            // 先定 Y 轴方向可延伸长度，再定X轴方向可延伸长度（背板）
                            let canZmin = originPoint.z - BOARDCONFIG.thickness / 2
                            let canZmax = originPoint.z + BOARDCONFIG.thickness / 2

                            // 当点击处向Z负方向延伸厚度一半时，会与后侧板材重叠的情况下
                            if ((originPoint.z - canBuildArea.minZ) >=0  && (originPoint.z - canBuildArea.minZ ) < (BOARDCONFIG.thickness / 2) ) {
                                canZmin = canBuildArea.minZ
                                canZmax = canBuildArea.minZ + BOARDCONFIG.thickness
                            }
                            // 当点击处向Z正方向延伸厚度一半时，会与前侧板材重叠的情况下
                            if ((canBuildArea.maxZ - originPoint.z )>=0 && (canBuildArea.maxZ - originPoint.z )< (BOARDCONFIG.thickness / 2) ) {
                                canZmin = canBuildArea.maxZ  - BOARDCONFIG.thickness
                                canZmax = canBuildArea.maxZ
                            }


                            // 当该物体处于 Y 长度范围内，且在高度平面内
                            let judgeInY = geoVerticesTure.objectMinY >= canBuildArea.maxY || geoVerticesTure.objectMaxY <= canBuildArea.minY
                            let judgeInZ = geoVerticesTure.objectMinZ >= canZmax || geoVerticesTure.objectMaxZ <= canZmin

                            if(!judgeInY && !judgeInZ){
                                // 物体在右侧，取得最大 X
                                if(originPoint.x < geoVerticesTure.objectMinX){
                                    if(nearMeshAxes.maxX){
                                        if(nearMeshAxes.maxX > geoVerticesTure.objectMinX){
                                            nearMeshAxes.maxX = geoVerticesTure.objectMinX
                                        }
                                    }else{
                                        nearMeshAxes.maxX = geoVerticesTure.objectMinX
                                    }
                                }else{

                                    // 物体在左侧，取得最小 X
                                    if(nearMeshAxes.minX){
                                        if(nearMeshAxes.minX < geoVerticesTure.objectMaxX){
                                            nearMeshAxes.minX = geoVerticesTure.objectMaxX
                                        }
                                    }else{
                                        nearMeshAxes.minX = geoVerticesTure.objectMaxX
                                    }

                                }

                            }
                        }
                            break;
                        case 'SIDE_BOARD':
                        {
                            // 先定 Y 轴方向可延伸长度，再定 Z 轴方向可延伸长度（左板）
                            let canXmin = originPoint.x - BOARDCONFIG.thickness / 2
                            let canXmax = originPoint.x + BOARDCONFIG.thickness / 2

                            // 当点击处向X负方向延伸厚度一半时，会与左侧板材重叠的情况下
                            if ((originPoint.x - canBuildArea.minX) >=0  && (originPoint.x - canBuildArea.minX ) < (BOARDCONFIG.thickness / 2) ){
                                canXmin = canBuildArea.minX
                                canXmax = canBuildArea.minX + BOARDCONFIG.thickness
                            }
                            // 当点击处向X负方向延伸厚度一半时，会与右侧板材重叠的情况下
                            if ((canBuildArea.maxX - originPoint.x )>=0 && (canBuildArea.maxX - originPoint.x )< (BOARDCONFIG.thickness / 2) ){
                                canXmin = canBuildArea.maxX  - BOARDCONFIG.thickness
                                canXmax = canBuildArea.maxX
                            }


                            // 当该物体处于 Y 长度范围内，且在高度平面内
                            let judgeInY = geoVerticesTure.objectMinY >= canBuildArea.maxY || geoVerticesTure.objectMaxY <= canBuildArea.minY
                            let judgeInX = geoVerticesTure.objectMinX >= canXmax || geoVerticesTure.objectMaxX <= canXmin

                            if(!judgeInY && !judgeInX){

                                // 物体在前侧，取得最大 Z
                                if(originPoint.z < geoVerticesTure.objectMinZ){
                                    if(nearMeshAxes.maxZ){
                                        if(nearMeshAxes.maxZ > geoVerticesTure.objectMinZ){
                                            nearMeshAxes.maxZ = geoVerticesTure.objectMinZ
                                        }
                                    }else{
                                        nearMeshAxes.maxZ = geoVerticesTure.objectMinZ
                                    }
                                }else{

                                    // 物体在后侧，取得最小 Z
                                    if(nearMeshAxes.minZ){
                                        if(nearMeshAxes.minZ < geoVerticesTure.objectMaxZ){

                                            nearMeshAxes.minZ = geoVerticesTure.objectMaxZ
                                        }
                                    }else{
                                        nearMeshAxes.minZ = geoVerticesTure.objectMaxZ
                                    }

                                }

                            }
                        }
                            break;
                        case 'HORIZONTAL_BOARD':
                        {
                            // 先定Z轴方向可延伸长度，再定X轴方向可延伸长度（横板）

                            // 计算添加板材时最大y和最小y,当点击位置距离边界值距离不足厚度一半时，需要平移坐标到刚好平行的位置，避免重叠
                            let canYmin = originPoint.y - BOARDCONFIG.thickness / 2;
                            let canYmax = originPoint.y + BOARDCONFIG.thickness / 2;

                            // 当点击处向下延伸厚度一半时，会与下侧板材重叠的情况下
                            if ((originPoint.y - canBuildArea.minY) >=0  && (originPoint.y - canBuildArea.minY ) < (BOARDCONFIG.thickness / 2) ){
                                canYmin = canBuildArea.minY
                                canYmax = canBuildArea.minY + BOARDCONFIG.thickness
                            }
                            // 当点击处向上延伸厚度一半时，会与上侧板材重叠的情况下
                            if ((canBuildArea.maxY - originPoint.y )>=0 && (canBuildArea.maxY - originPoint.y )< (BOARDCONFIG.thickness / 2) )  {
                                canYmin = canBuildArea.maxY  - BOARDCONFIG.thickness
                                canYmax = canBuildArea.maxY
                            }


                            // 当该物体处于 Z 长度范围内，且在高度平面内
                            let judgeInZ = geoVerticesTure.objectMinZ >= canBuildArea.maxZ || geoVerticesTure.objectMaxZ <= canBuildArea.minZ;
                            let judgeInY = geoVerticesTure.objectMinY >= canYmax || geoVerticesTure.objectMaxY <= canYmin;


                            if(!judgeInZ && !judgeInY){
                                // 物体在右侧，取得最大 X
                                if(originPoint.x < geoVerticesTure.objectMinX){
                                    if(nearMeshAxes.maxX){
                                        if(nearMeshAxes.maxX > geoVerticesTure.objectMinX){
                                            nearMeshAxes.maxX = geoVerticesTure.objectMinX
                                        }
                                    }else{
                                        nearMeshAxes.maxX = geoVerticesTure.objectMinX
                                    }
                                }else{
                                    // 物体在左侧，取得最小 X
                                    if(nearMeshAxes.minX){

                                        if(nearMeshAxes.minX < geoVerticesTure.objectMaxX){
                                            nearMeshAxes.minX = geoVerticesTure.objectMaxX
                                        }
                                    }else{
                                        nearMeshAxes.minX = geoVerticesTure.objectMaxX
                                    }

                                }

                            }
                        }
                            break;
                    }

                }
            }


            console.log('nearMeshAxes遍历后个方向的临界值:', nearMeshAxes)



            

            switch (cubeFaceType) {
                case 'VERCITAL_BOARD':
                {
                    let distanceX = nearMeshAxes.maxX - nearMeshAxes.minX;
                    let distanceY = canBuildArea.maxY - canBuildArea.minY;

                    if (distanceY > 0 && distanceX>0) {
                        // 当点击处向Z负方向延伸厚度一半时，会与后侧板材重叠的情况下
                        if ((originPoint.z - canBuildArea.minZ) >=0  && (originPoint.z - canBuildArea.minZ ) < (BOARDCONFIG.thickness / 2) ) {
                            originPoint.z = canBuildArea.minZ + BOARDCONFIG.thickness / 2
                        }
                        // 当点击处向Z正方向延伸厚度一半时，会与前侧板材重叠的情况下
                        if ((canBuildArea.maxZ - originPoint.z )>=0 && (canBuildArea.maxZ - originPoint.z )< (BOARDCONFIG.thickness / 2) ) {
                            originPoint.z = canBuildArea.maxZ - BOARDCONFIG.thickness / 2
                        }

                        addCubePosition.set(nearMeshAxes.maxX - distanceX / 2, canBuildArea.maxY - distanceY / 2, originPoint.z);
                        console.log('XY背板:', addCubePosition);


                        addCubeOptions = {
                            length: distanceX,
                            width: distanceY ,
                            position: addCubePosition
                        };

                        if(designer.GLOBAL_CONFIG.addPreviewSet){

                            scope.cubeForPreview.scale.set(distanceX, distanceY, BOARDCONFIG.thickness);
                            scope.cubeForPreview.position.copy(addCubePosition);
                            scope.cubeForPreview.visible = true

                        }


                        spaceEnough = true

                    }else{
                        console.log('空间不足XY');
                        if(scope.cubeForPreview){
                            scope.cubeForPreview.visible = false;
                        }
                        spaceEnough = false;
                    }
                }
                    break;
                case 'SIDE_BOARD':
                {
                    let distanceY = canBuildArea.maxY - canBuildArea.minY;
                    let distanceZ = nearMeshAxes.maxZ - nearMeshAxes.minZ;
                    // 空间长度（X）大于板面厚度时
                    if (distanceY > 0 && distanceZ > 0) {

                        // 当点击处向X负方向延伸厚度一半时，会与左侧板材重叠的情况下
                        if ((originPoint.x - canBuildArea.minX) >=0  && (originPoint.x - canBuildArea.minX ) < (BOARDCONFIG.thickness / 2) ){
                            originPoint.x = canBuildArea.minX + BOARDCONFIG.thickness / 2
                        }
                        // 当点击处向X负方向延伸厚度一半时，会与右侧板材重叠的情况下
                        if ((canBuildArea.maxX - originPoint.x )>=0 && (canBuildArea.maxX - originPoint.x )< (BOARDCONFIG.thickness / 2) ){
                            originPoint.x = canBuildArea.maxX - BOARDCONFIG.thickness / 2
                        }

                        addCubePosition.set(originPoint.x, canBuildArea.maxY - distanceY / 2, nearMeshAxes.maxZ - distanceZ / 2);
                        console.log('ZY:', addCubePosition);
                        // moveingObj.scale.set(distanceY, BOARDCONFIG.thickness, distanceZ)
                        // moveingObj.rotateZ( - Math.PI / 2 )

                        addCubeOptions = {
                            length: distanceZ,
                            width: distanceY ,
                            position: addCubePosition
                        };

                        if(designer.GLOBAL_CONFIG.addPreviewSet){

                            scope.cubeForPreview.scale.set(BOARDCONFIG.thickness, distanceY, distanceZ);
                            scope.cubeForPreview.position.copy(addCubePosition);
                            scope.cubeForPreview.visible = true;

                        }


                        spaceEnough = true;

                    }else{
                        console.log('空间不足ZY');
                        if(scope.cubeForPreview){
                            scope.cubeForPreview.visible = false;
                        }

                        spaceEnough = false;
                    }
                }
                    break;
                case 'HORIZONTAL_BOARD':
                {
                    let distanceX = nearMeshAxes.maxX - nearMeshAxes.minX;
                    let distanceZ = canBuildArea.maxZ - canBuildArea.minZ;

                    if (distanceZ > 0 && distanceX > 0) {

                        // 当点击处向下延伸厚度一半时，会与下侧板材重叠的情况下
                        if ((originPoint.y - canBuildArea.minY) >=0  && (originPoint.y - canBuildArea.minY ) < (BOARDCONFIG.thickness / 2) ){
                            originPoint.y = canBuildArea.minY + BOARDCONFIG.thickness / 2
                        }
                        // 当点击处向上延伸厚度一半时，会与上侧板材重叠的情况下
                        if ((canBuildArea.maxY - originPoint.y )>=0 && (canBuildArea.maxY - originPoint.y )< (BOARDCONFIG.thickness / 2) )  {
                            originPoint.y = canBuildArea.maxY - BOARDCONFIG.thickness / 2
                        }

                        addCubePosition.set(nearMeshAxes.maxX - distanceX / 2, originPoint.y, canBuildArea.maxZ - distanceZ / 2);
                        addCubeOptions = {
                            length: distanceX,
                            width: distanceZ ,
                            position: addCubePosition
                        };

                        if(designer.GLOBAL_CONFIG.addPreviewSet){

                            console.log('cubeForPreview',scope.cubeForPreview)
                            scope.cubeForPreview.scale.set(distanceX, BOARDCONFIG.thickness, distanceZ);
                            scope.cubeForPreview.position.copy(addCubePosition);
                            scope.cubeForPreview.visible = true;

                        }

                        spaceEnough = true;

                    }else{
                        console.log('空间不足XZ');
                        if(scope.cubeForPreview){
                            scope.cubeForPreview.visible = false;
                        }
                        spaceEnough = false;
                    }
                }
                    break;
            }





        }
        
        function joinBoardToSecen() {

            console.log('addCubePosition:', addCubeOptions);

            let options = Object.assign({}, scope.boardOptions, addCubeOptions);

            designer.execCmd('ADD_BOARD',options);
        }

        // 计算几何体顶点区间
        function getGeometrySizeOptions(mesh) {

            let geo = mesh.geometry;
            let geoVerticesTure = {
                objectMaxX: mesh.position.x,
                objectMinX: mesh.position.x,
                objectMaxY: mesh.position.y,
                objectMinY: mesh.position.y,
                objectMaxZ: mesh.position.z,
                objectMinZ: mesh.position.z,
            }

            for(let i in geo.vertices){
                let globaVer = geo.vertices[i].clone().applyMatrix4(mesh.matrix);
                globaVer.x = Math.round(globaVer.x)
                globaVer.y = Math.round(globaVer.y)
                globaVer.z = Math.round(globaVer.z)

                if(globaVer.x > geoVerticesTure.objectMaxX){
                    geoVerticesTure.objectMaxX = globaVer.x

                }
                if(globaVer.x < geoVerticesTure.objectMinX){
                    geoVerticesTure.objectMinX = globaVer.x

                }
                if(globaVer.y > geoVerticesTure.objectMaxY){
                    geoVerticesTure.objectMaxY = globaVer.y

                }
                if(globaVer.y < geoVerticesTure.objectMinY){
                    geoVerticesTure.objectMinY = globaVer.y

                }
                if(globaVer.z > geoVerticesTure.objectMaxZ){
                    geoVerticesTure.objectMaxZ = globaVer.z


                }
                if(globaVer.z < geoVerticesTure.objectMinZ){
                    geoVerticesTure.objectMinZ = globaVer.z

                }

            }

            return geoVerticesTure;
        }

        /*
         * 发射线
         * originPoint：射线起点
         * Vector： 方向向量
         * */
        function rayCollision(originPoint,Vector ) {

            let ray = new THREE.Raycaster(originPoint.clone(), Vector);
            let collisionResult = ray.intersectObjects(designer.sceneObjects);
            // console.log('collisionResult',collisionResult)
            if (collisionResult.length > 0) {
                hadOrthogonal.push(collisionResult[0].object)

                // 绘制射线，用于调试
                // let _lineSegmentsPath = new THREE.Geometry();
                // _lineSegmentsPath.vertices = [originPoint.clone(), collisionResult[0].point];
                // let _lineSegments = new THREE.LineSegments( _lineSegmentsPath, new THREE.LineBasicMaterial({
                //     color: 0x0000ff
                // }) );
                // _scene.add( _lineSegments );

                return collisionResult[0].point
            }
            return originPoint.clone()

        }

        // 勾选对齐时 position 变化
        function tobeAalign(position,type ) {

            for(let i=6;i<designer.sceneObjects.length;i++){
                let object = designer.sceneObjects[i]
                if(object.selfFaceType == scope.addType && Math.abs(position[type] - object.position[type])<=designer.GLOBAL_CONFIG.nearDistance){

                    let geoVerticesTure = getGeometrySizeOptions(object);


                    if(type == 'x'){
                        if((position.y < geoVerticesTure.objectMinY || position.y > geoVerticesTure.objectMaxY)||
                            (position.z < geoVerticesTure.objectMinZ || position.z > geoVerticesTure.objectMaxZ)){
                            position[type] = object.position[type]
                        }
                    }
                    if(type == 'y'){
                        if((position.x < geoVerticesTure.objectMinX || position.x > geoVerticesTure.objectMaxY)||
                            (position.z < geoVerticesTure.objectMinZ || position.z > geoVerticesTure.objectMaxZ)){
                            position[type] = object.position[type]
                        }
                    }
                    if(type == 'z'){
                        if((position.x < geoVerticesTure.objectMinX || position.x > geoVerticesTure.objectMaxY)||
                            (position.y < geoVerticesTure.objectMinY || position.y > geoVerticesTure.objectMaxY)){
                           position[type] = object.position[type]
                        }
                    }
                }
            }

        }


        function addHightBox(object, type) {

            if(type == 'Hover'){

                if(_highlightBoxHover){
                    updateHighlightBox(_highlightBoxHover,object )
                }else{
                    let bbox = new THREE.BoxHelper(object, 0xffffff);
                    bbox.name = 'hightBoxHover'
                    _scene.add(bbox);
                    _highlightBoxHover = bbox
                }
            }

            if(type == 'Click'){
                if(_highlightBoxClick){
                    updateHighlightBox(_highlightBoxClick,object )
                }else{
                    let bbox = new THREE.BoxHelper(object, 0xffffff);
                    bbox.name = 'hightBoxClick'
                    _scene.add(bbox);
                    _highlightBoxClick = bbox
                }

            }
        }

        // 传参的时候做删除，无参做隐藏
        function deleteHelps(type) {

            if(type){
                _scene.remove(_scene.getObjectByName(`hightBox${type}`));

                switch (type){
                    case 'Click':
                        _highlightBoxClick = null
                        break;
                }
            }

            if(_highlightBoxHover){
                _highlightBoxHover.visible = false
            }

        }

        function updateHighlightBox(_box, _mesh) {

            _box.setFromObject(_mesh); // 更新盒辅助
            _box.visible = true;

        }

        // function cancelAdding() {
        //     self.startADDING = false
        // }

        function initPlaneColor() {
            let modelFacesGroup = Object.values(designer.currentModel.faces)
            for (let i = 0; i < modelFacesGroup.length; i++) {
                modelFacesGroup[i].material = planeMaterial
            }
        }

        // 选择的 Plane 变色处理
        function updatePlaneColor(mesh) {

            let materialUpdate = mesh.material.clone();
            materialUpdate.setValues({color: 0x2f9b03})
            mesh.material = materialUpdate
        }


        // 转换坐标
        function getMousePosition( dom, x, y ) {

            let rect = dom.getBoundingClientRect();
            return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];

        }


        // 获取射线上的对象
        function getIntersects( point, objects ) {

            _mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );

            _raycaster.setFromCamera( _mouse, _camera );

            return _raycaster.intersectObjects( objects );

        }

	}



}

export default ModelControls;