
import Board from"./Board";

import * as THREE from 'three';

class HorizontalBoard extends Board {

	constructor(options){
		super(options);

		this.obj.rotation.x = Math.PI / 2;

		if(options.position){
			this.obj.position.copy(options.position);
		}else{
			this.obj.position.x = this.length / 2;
			this.obj.position.z = this.width / 2;
			this.obj.position.y = this.thickness / 2;
		}

		


		this.obj.updateMatrix();
	}

	
	// setSize(size){
		

	// 	this.obj.scale.x = size.length / this.obj.geometry.parameters.width;
	// 	this.obj.scale.y = size.width / this.obj.geometry.parameters.height;
	// 	this.obj.scale.z = size.thickness / this.obj.geometry.parameters.depth;
	// }

	
}

export default HorizontalBoard;