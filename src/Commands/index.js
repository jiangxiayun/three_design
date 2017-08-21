


import addBoard from "./addBoard.command.js";
import addModel from "./addModel.command.js";
import changeModel from "./changeModel.command.js";
import setBoardPosition from "./setBoardPosition.command.js";
import setBoardRotation from "./setBoardRotation.command.js";
import setBoardSize from "./setBoardSize.command.js";
import setBoardTexture from "./setBoardTexture.command.js";
import addRulerHelper from "./addRuler.command.js";
import changeRulerHelper from "./changeRuler.command.js";
import hideRulerHelper from "./hideRuler.command.js";
import { addScenePopupMenu } from "./setSceneMenu.command.js";
import { AnimationReset } from "../Controls/Animation";


import _ from "lodash";


const addGetCommand = Symbol('addGetCommand');
const addOptCommand = Symbol('addOptCommand');
const addHelperCommand = Symbol('addHelperCommand');
/**
 * 为designer的信号绑定命令
 * 
 * @class Commands
 */
class Commands {

	constructor(designer){

		this[addGetCommand](designer);

		this[addOptCommand](designer);

		this[addHelperCommand](designer);



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

        // 获取当前标尺
        designer.cmds.GET_CURRENT_RULER.add( (callback) =>{

            if(typeof callback == 'function'){
                callback(designer.currentRuler);
            }

        });
	}
	
	[addOptCommand](designer){


		// 添加模型
		designer.cmds.ADD_MODEL.add( (options) =>{


        		let model = addModel( designer.scene ,options);

        		designer.currentModel = model;
                    designer.GLOBAL_CONFIG.modelSize = {
                        width:options.width,
                        height:options.height,
                        depth:options.depth,
                    }

                    designer.sceneObjects = [...(Object.values(model.faces))]
                    designer.modelControls.enabled = true;   // 激活 modelControls

		})


		// 修改模型
        designer.cmds.CHANGE_MODEL.add( (newModel) =>{

        	changeModel( designer.currentModel , newModel);
        })

		// 添加板材

        designer.cmds.ADD_BOARD.add( (options) =>{

        	let board = addBoard( designer ,options);
        	designer.boards.push(board);
        	designer.sceneObjects.push(board.obj);
        })


        // 修改板材
        designer.cmds.SET_BOARD.add( (options) =>{
                // debugger;
                let board = _.find(designer.boards, o => o.obj.uuid == designer.selectedBoard.uuid);

                    console.log(board,options)
                switch(options.type){

                        case 'size' :
                                setBoardSize(board , options.data);
                                break;
                        case 'position' :
                                setBoardPosition(board , options.data);
                                break;
                        case 'rotation' :
                                setBoardRotation(board , options.data);
                                break;
                        case 'texture' :
                                setBoardTexture(board , options.data);
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

		// 右键全局场景弹窗
        designer.cmds.SCENE_MENU.add((position) => {
			if(designer.popup){
                designer.popup = addScenePopupMenu(designer, position, 'global', 'change')
			}else{
                designer.popup = addScenePopupMenu(designer, position, 'global', 'new')
			}
		})
		// 右键板材设置弹窗
        designer.cmds.BOARD_MENU.add((position) => {
            if(designer.popup){
                designer.popup = addScenePopupMenu(designer, position, 'board', 'change')
            }else{
                designer.popup = addScenePopupMenu(designer, position, 'board', 'new')
            }
        })
		// 移除场景弹窗菜单
        designer.cmds.REMOVE_SCENE_MENU.add(() => {
            designer.popup.clearDom()
        })


        // 普通板材转换为门板
        designer.cmds.TRANSFORM_BOARD_TO_DOOR.add(() => {
            designer.execCmd('GET_SELECTED_BOARD',function (selectedBoard) {
                selectedBoard.effectType = {
                    type: 'door',
                    direction: 'turn-left',
                    canOpen: true
                }
                designer.animationObject.push(selectedBoard);
            });

            // console.log(designer.animationObject)
        })

        // 门板转换为抽屉
        designer.cmds.TRANSFORM_DOOR_TO_DRAWER.add(() => {
            designer.execCmd('GET_SELECTED_BOARD',function (selectedBoard) {
                selectedBoard.effectType.type = 'drawer';
                selectedBoard.effectType.direction = 'turn-left';
            });

        })

        // 抽屉转换为门板
        designer.cmds.TRANSFORM_DRAWER_TO_DOOR.add(() => {

            designer.execCmd('GET_SELECTED_BOARD',function (selectedBoard) {
                selectedBoard.effectType.type = 'door';
                selectedBoard.effectType.direction = 'turn-left';
            });
        })



	}

    [addHelperCommand](designer){

        // 添加标尺
        designer.cmds.HRLPER_ADD_RULER.add( (options) =>{

            let ruler = addRulerHelper( designer ,options);
            designer.currentRuler = ruler;
            designer.rulerOPtions = options

        })

        // 修改标尺
        designer.cmds.HRLPER_CHANGE_RULER.add( (options) =>{

            changeRulerHelper( designer.currentRuler , options);
            designer.rulerOPtions = options
        })

        // 隐藏标尺
        designer.cmds.HRLPER_HIDE_RULER.add( () =>{

            hideRulerHelper( designer.currentRuler );

        })


		// 还原门板位置
        designer.cmds.ANIMATION_RESET.add( () =>{

            AnimationReset( designer.animationObject );

        })
	}
}


export default Commands;