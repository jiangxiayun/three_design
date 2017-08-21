

import UIComponent from "./UIComponent";
import $ from "jquery";
import _ from "lodash";

const createSceneDom = Symbol('createSceneDom');

class SceneMenu extends UIComponent {

    constructor ( designer, position, type, action){

        super(designer, position);

        this.clearDom();
        // 初始化wrapper
        this.$wrapper = this[createSceneDom](position, type, designer);

        // 渲染dom
        // this.renderDOM();

        // 绑定命令
        if(action == 'new'){
            this.bindCommands(designer);
        }


        // 将dom添加到视图中
        super.appendToView();

        // 下拉菜单
        $('.ui.dropdown').dropdown({
            on: 'hover'
        });
    }

    renderDOM(){

        super.renderDOM(this.data);

    }

    bindCommands ( designer ){


        $("body").on("click",'#openDoors',function(e) {
            designer.animation_open = true
        })
        $("body").on("click",'#closeDoors',function(e) {
            designer.animation_close = true
        })
        $("body").on("click",'#boardToDoor',function(e) {

            designer.execCmd('TRANSFORM_BOARD_TO_DOOR');

        });
        $("body").on("click",'#doorToDrawer',function(e) {
            designer.execCmd('TRANSFORM_DOOR_TO_DRAWER');
        })
        $("body").on("click",'#drawerToDoor',function(e) {
            designer.execCmd('TRANSFORM_DRAWER_TO_DOOR');
        })

        $("body").on("click",'#scene_menu *',function(e) {
            designer.execCmd('REMOVE_SCENE_MENU');
        })
    }

    clearDom () {
        $('#scene_menu').remove();
    }

    [createSceneDom] (position, type, designer) {

        let board = designer.selectedBoard;

        let html = '';
        if(type == 'global'){
            let item = '';

            if(designer.animationObject.length > 0){
                item = `<div class="ui dropdown item">
                    全部门板<i class="dropdown icon"></i>
                    <div class="menu">
                      <a class="item" id="openDoors"><i class="clone icon"></i> 打开</a>
                      <a class="item" id="closeDoors"><i class="sign in icon"></i> 关闭</a>
                    </div>
                  </div>`
            }
            html = `<div class="ui vertical menu" id="scene_menu" style="left:${position.x}px;top:${position.y-10}px;">
                  <a class="item">全局设置</a>
                  ${item}
        </div>`
        }else if(type == 'board'){

            let item = '';
            switch (board.effectType.type){
                case 'board':
                    item = `<a class="item" id="boardToDoor">转换为门板</a>`
                    break;
                case 'door':
                    item = `<a class="item" id="doorToDrawer">转换为抽屉</a>`
                    break;
                case 'drawer':
                    item = `<a class="item" id="drawerToDoor">转换为门板</a>`
                    break;
                case '':
                    break;
            }
            html = `<div class="ui vertical menu" id="scene_menu" style="left:${position.x}px;top:${position.y-10}px;">
                  ${item}
                  <div class="ui dropdown item">
                    More<i class="dropdown icon"></i>
                    <div class="menu">
                      <a class="item"><i class="edit icon"></i> Edit Profile</a>
                      <a class="item"><i class="globe icon"></i> Choose Language</a>
                      <a class="item"><i class="settings icon"></i> Account Settings</a>
                    </div>
                  </div>
        </div>`
        }





        return html
    }




}

export default SceneMenu;