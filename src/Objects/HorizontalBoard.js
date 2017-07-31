
import Board from"./Board";

import * as THREE from 'three';

class HorizontalBoard extends Board {

	constructor(options){
		super(options);

		this.obj.rotation.x = Math.PI / 2;

		if(options.position){
			this.obj.position.copy(position);
		}else{
			this.obj.position.x = this.length / 2;
			this.obj.position.z = this.width / 2;
			this.obj.position.y = this.thickness / 2;
		}

		


		this.obj.updateMatrix();
	}

	
	setSize(size){

	}

	setPosition(pos){

	}
	setRotation(pos){

	}
}

export default HorizontalBoard;