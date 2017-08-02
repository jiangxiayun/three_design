import  HorizontalBoard from "../Objects/HorizontalBoard";
import  VerticalBoard from "../Objects/VerticalBoard";
import  SideBoard from "../Objects/SideBoard";


const addBoard = (designer ,options) =>{

	let board = null;

	switch (options.type){
		case 'HORIZONTAL_BOARD':
			board = new HorizontalBoard(options);
			break;
		case 'VERCITAL_BOARD':
			board = new VerticalBoard(options);
			break;
		case 'SIDE_BOARD':
			board = new SideBoard(options);
			break;
	}
    board.selfFaceType = options.type;
	board.joinScene(designer.scene);
	return board;
}

export default addBoard;