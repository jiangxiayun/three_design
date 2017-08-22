import * as THREE from "three";

import _ from "lodash";

/**
 * 
 * 
 * @class BoardControls
 */
class BoardControls {

	constructor(designer){
		let scope = this;

		scope.enable = true;

		let _domElement = designer.renderer.domElement,
			_camera = designer.camera;




		_domElement.addEventListener("mousemove",onMouseMove);

		_domElement.addEventListener('mousedown',onMouseDown);

		

		function onMouseMove (event)  {
			event.preventDefault();
			if(scope.enable && designer.boards.length > 0){

			}
		}

		function onMouseDown  (event)  {

			event.preventDefault();
			if(scope.enable && designer.boards.length > 0 && designer && event.button ==0){

				let boardMeshs = _.map(designer.boards , "obj");
				
				let targetBoardMesh  =  intersectObjects(event,boardMeshs);
				
				// 判断是否正在准备添加板材
				designer.execCmd('GET_ISREADY_INSERT',(isReadyAdd) =>{
					console.log( targetBoardMesh,isReadyAdd)
					if(targetBoardMesh && !isReadyAdd){
						let targetBoard = _.find(designer.boards, o => o.obj.uuid == targetBoardMesh.object.uuid);
						
						designer.selectedBoard = targetBoard.obj;
						
						designer.execCmd('SHOW_BOARD_OPTIONS',targetBoard)
					}else{
						designer.execCmd('HIDE_BOARD_OPTIONS')
					}
				})
				
			}else{
				designer.execCmd('HIDE_BOARD_OPTIONS')
			}
		}

		function intersectObjects (pointer ,objects)  {
			
            let rect = _domElement.getBoundingClientRect();
            let x = ( pointer.clientX - rect.left ) / rect.width;
            let y = ( pointer.clientY - rect.top ) / rect.height;


            let pointerVector = new THREE.Vector2();
            let ray = new THREE.Raycaster();

            pointerVector.set( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
            ray.setFromCamera( pointerVector, _camera );

            let intersections = ray.intersectObjects( objects );

            if( intersections.length > 0 ){
				console.log(intersections)
                return intersections [ 0 ]; 

            }

            return false;
		}

	}

}

export default BoardControls;