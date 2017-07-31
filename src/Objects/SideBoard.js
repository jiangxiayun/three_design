
import Board from"./Board"

class SideBoard extends Board {

	constructor(options){
		super(options);

		if(options.position){
			this.obj.position.copy(position);
		}else{
			this.obj.rotation.y = Math.PI / 2;
			this.obj.position.x = this.thickness / 2;
			this.obj.position.z = this.length / 2;
			this.obj.position.y = this.width / 2;
		}
	}

	setSize(size){

	}

	setPosition(pos){

	}
	setRotation(pos){

	}
}

export default SideBoard;