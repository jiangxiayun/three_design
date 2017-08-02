
import Board from"./Board"

class VerticalBoard extends Board {

	constructor(options){
		super(options);

		if(options.position){
			this.obj.position.copy(options.position);
		}else{
			this.obj.position.x = this.length / 2;
			this.obj.position.z = this.thickness / 2;
			this.obj.position.y = this.width / 2;
		}
	}

	removeSelf(){
		
	}

	setSize(size){

	}

	setPosition(pos){

	}
	setRotation(pos){

	}
}

export default VerticalBoard;