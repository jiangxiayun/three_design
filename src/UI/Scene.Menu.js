

import UIComponent from "./UIComponent";
import $ from "jquery";
import _ from "lodash";

const createSceneDom = Symbol('createSceneDom');

class SceneMenu extends UIComponent {

    constructor ( designer, position, type){

        super(designer, position);

        this.clearDom();
        // 初始化wrapper
        this.$wrapper = this[createSceneDom](position, type);

        // 渲染dom
        // this.renderDOM();

        // 绑定命令
        this.bindCommands(designer);

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

        //
        // $("body").on("change",'#ruler_SX',function(e) {
        //     // designer.GLOBAL_CONFIG.alignSet = this.checked
        // })
        // $("body").on("change",'#ruler_SY',function(e) {
        //
        // })
        // $("body").on("change",'#ruler_SZ',function(e) {
        //
        // })
        // $("body").on("change",'#ruler_PX',function(e) {
        //
        // })
        // $("body").on("change",'#ruler_PY',function(e) {
        //
        // })
        // $("body").on("change",'#ruler_PZ',function(e) {
        //
        // })

    }

    clearDom () {
        $('#scene_menu').remove();
    }

    [createSceneDom] (position, type) {


        let html = '';
        if(type == 'global'){
            html = `<div class="ui vertical menu" id="scene_menu" style="left:${position.x}px;top:${position.y-10}px;">
                  <a class="item">全局设置</a>
                  <div class="ui dropdown item">
                    More<i class="dropdown icon"></i>
                    <div class="menu">
                      <a class="item"><i class="edit icon"></i> Edit Profile</a>
                      <a class="item"><i class="globe icon"></i> Choose Language</a>
                      <a class="item"><i class="settings icon"></i> Account Settings</a>
                    </div>
                  </div>
        </div>`
        }else if(type == 'board'){
            html = `<div class="ui vertical menu" id="scene_menu" style="left:${position.x}px;top:${position.y-10}px;">
                  <a class="item">单板设置</a>
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