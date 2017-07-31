

import * as THREE from 'three';


const DEFAULT_THINKNESS = 19;
const DEFAULT_MATERIAL_CONFIG = {
	color :0xff00ff
}


class Board {

	constructor(options){
	
		this.size = options.size;
		this.id = options.id ;
		this.name = options.name;
		this.length = options.length;
		this.width = options.width;
		this.thickness = DEFAULT_THINKNESS;
		this.geo = new THREE.BoxGeometry(options.length,options.width,DEFAULT_THINKNESS);
		this.mat = new THREE.MeshBasicMaterial(DEFAULT_MATERIAL_CONFIG);
		this.obj = new THREE.Mesh(this.geo , this.mat);
	}

	joinScene(scene){
		scene.add(this.obj);
	}

}

export default Board;