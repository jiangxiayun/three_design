

import UIComponent from "./UIComponent";
import $ from "jquery";


class BottomMenu extends UIComponent {

    constructor ( designer ,data){

        super(designer,data);

        // 初始化wrapper
        this.$wrapper = $(`  
            <div class="bottom-menu">
                <div class="ui checkbox">
                    <input type="checkbox" name="align" id="alignSet">
                    <label>对齐</label>
                </div>
                <div class="ui checkbox">
                    <input type="checkbox" name="addPreviewSet" id="addPreviewSet">
                    <label>添加面板预览</label>
                </div>
                <div class="ui checkbox">
                    <input type="checkbox" name="showRuler" id="showRuler">
                    <label>标尺</label>
                </div>
            </div>
        `);

        // 渲染dom
        this.renderDOM();

        // 绑定命令
        this.bindCommands(designer,designer.cmds);

        // 将dom添加到视图中
        super.appendToView();

    }
    renderDOM(){

        
        super.renderDOM(this.data);


    }

    bindCommands ( designer ){

        //对齐点击事件
        $("body").on("change",'.bottom-menu #alignSet',function(e) {

            designer.GLOBAL_CONFIG.alignSet = this.checked

        })

        //预览点击事件
        $("body").on("change",'.bottom-menu #addPreviewSet',function(e) {

            designer.GLOBAL_CONFIG.addPreviewSet = this.checked

        })

        //标尺点击事件
        $("body").on("change",'.bottom-menu #showRuler',function(e) {

            designer.GLOBAL_CONFIG.showRuler = this.checked
            if(!this.checked){

                designer.execCmd('HRLPER_HIDE_RULER');

            }


        })

    
       
    }
}

export default BottomMenu;