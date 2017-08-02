

import * as THREE from 'three';
import {TEXTURECONFIG} from "../Config/config"

const DEFAULT_THINKNESS = 18;
const DEFAULT_MATERIAL_CONFIG = {
	color :0xff00ff
}
const TextureLoader = new THREE.TextureLoader();

class Board {

	constructor(options){
	
		this.size = options.size;
		this.id = options.id ;
		this.name = options.name;
		this.length = options.length;
		this.width = options.width;
		this.thickness = DEFAULT_THINKNESS;
		this.geo = new THREE.BoxGeometry(options.length,options.width,DEFAULT_THINKNESS);

        let texture = TextureLoader.load( options.img );
        texture.anisotropy = TEXTURECONFIG.maxAnisotropy;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

		this.mat = new THREE.MeshBasicMaterial({map: texture});
		this.obj = new THREE.Mesh(this.geo , this.mat);

	}

	joinScene(scene){
		scene.add(this.obj);
	}

}

export default Board;