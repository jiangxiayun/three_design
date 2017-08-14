

import UIComponent from "./UIComponent";
import $ from "jquery";
import _ from "lodash";
import { windowVector } from "../Config/config"

const createRulerDom = Symbol('createRulerDom');

class RulerSet extends UIComponent {

    constructor ( designer ,data){


        super(designer,data);
        this.clearRulers();
        // 初始化wrapper
        this.$wrapper = this[createRulerDom](designer.camera, designer.renderer.domElement, data);

        // 渲染dom
        this.renderDOM();

        // 绑定命令
        this.bindCommands(designer);

        // 将dom添加到视图中
        super.appendToView();

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

    clearRulers () {
        $('.rulerNum').remove();
    }

    [createRulerDom] (camera, dom, data) {

        let html = '';

        _.forIn( data , ( ruler, rulerName) =>{
            let text = '';
            switch (rulerName){
                case 'PX':
                    text = 'X:';
                    break;
                case 'PY':
                    text = 'Y:';
                    break;
                case 'PZ':
                    text = 'Z:';
                    break;
            }

            let position = windowVector(camera, dom, ruler[0]);
            html += `  
           <label class="rulerNum" id="ruler_${rulerName}" style="left:${position.wx}px;top:${position.wy}px;">
                <span>${text}${ruler[1]}</span>
                <input  value="${ruler[1]}" >
           </label>
        `
        });

        // _.forIn( data , ( ruler, rulerName) =>{
        //     let position = windowVector(camera, dom, ruler[0]);
        //     html += `
        //    <input class="rulerNum" id="ruler_${rulerName}" value="${ruler[1]}"
        //    style="left:${position.wx}px;top:${position.wy}px;">
        // `
        // });


        return html
    }




}

export default RulerSet;