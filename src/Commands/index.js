


import addBoard from "./addBoard.command.js";
import addModel from "./addModel.command.js";
import changeModel from "./changeModel.command.js";
import setBoardPosition from "./setBoardPosition.command.js";
import setBoardRotation from "./setBoardRotation.command.js";
import setBoardSize from "./setBoardSize.command.js";
import setBoardTexture from "./setBoardTexture.command.js";


import _ from "lodash";


const addGetCommand = Symbol('addGetCommand');
const addOptCommand = Symbol('addOptCommand');
/**
 * 为designer的信号绑定命令
 * 
 * @class Commands
 */
class Commands {

	constructor(designer){

		this[addGetCommand](designer);

		this[addOptCommand](designer);
	


	}

	[addGetCommand](designer){
		// 获取当前模型
		designer.cmds.GET_CURRENT_MODEL.add( (callback) =>{

			if(typeof callback == 'function'){
				callback(designer.currentModel);
			}

		});

		// 获取选择板材
		designer.cmds.GET_SELECTED_BOARD.add( (callback) =>{

			if(typeof callback == 'function'){
				callback(designer.selectedBoard);
			}
			
		} );


		// 获取当前scene中所有板材
		designer.cmds.GET_ALL_BOARD.add((callback) =>{

			if(typeof callback == 'function'){
				callback(designer.boards);
			}
			
		});
	}
	
	[addOptCommand](designer){


		// 添加模型
		designer.cmds.ADD_MODEL.add( (options) =>{


			let model = addModel( designer.scene ,options);

			designer.currentModel = model;
		})


		// 修改模型
        designer.cmds.CHANGE_MODEL.add( (newModel) =>{

        	changeModel( designer.currentModel , newModel);
        })

		// 添加板材
        designer.cmds.ADD_BOARD.add( (options) =>{

        	let board = addBoard( designer.scene ,options);
        	designer.boards.push(board);
        })

		// 修改板材
        designer.cmds.SET_BOARD.add( (type , options) =>{

        	let board = designer.selected ;

        	switch(type){

        		case 'size' :
        			setBoardSize(board , options);
        			break;
        		case 'position' :
        			setBoardPosition(board , options);
        			break;
        		case 'rotation' :
        			setBoardRotation(board , options);
        			break;
        		case 'texture' :
        			setBoardTexture(board , options);
        			break;

        	}


        })

		// 删除板材
        designer.cmds.REMOVE_BOARD.add( ( ) =>{

        	let readyRemoveBoard = designer.selectedBoard;

        	_.remove(designer.boards ,board => board.id == readyRemoveBoard.id);

        	removeBoard(designer.scene , board);

        })

		// 切换模式
        designer.cmds.CHANGE_MODE.add( () =>{

        })

		// 选择板材
        designer.cmds.SELECT_BOARD.add( (board) =>{
        	designer.selectedBoard = board;
        })
	}
}


export default Commands;