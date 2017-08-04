

import UIComponent from "./UIComponent";
import $ from "jquery";


class LibarySidebar extends UIComponent {

    constructor ( designer , libaryData ,uiWidth){

        super(designer,libaryData);

        this.data = libaryData;

        // 初始化wrapper
        this.$wrapper = $(`  
            <div class="ui segment" id='libary'>
                <div class="ui top attached tabular menu">
                    <a class="item active" data-tab="first">模型库</a>
                    <a class="item" data-tab="second">板材库</a>
                </div>
                <div class="ui bottom attached tab segment active" data-tab="first" >
                    <div class="ui divided items" id='modelLib'>
                    </div>
                </div>
                <div class="ui bottom attached tab segment " data-tab="second" >
                    <div class="ui divided items" id='boardLib'>
                    </div>
                </div>
            </div>
        `).css('width',uiWidth);

        // 渲染dom
        this.renderDOM();

        // 绑定命令
        this.bindCommands(designer,designer.cmds);

        // 将dom添加到视图中
        super.appendToView();

         // tab切换
        $('#libary .menu .item').tab();




    }
    renderDOM(){


        super.renderDOM(this.data);

        let modelData = this.data.modelData,
            boardData = this.data.boardData;

        let $wrapper = this.$wrapper;

        // 模型html
        modelData.forEach( (model) => {
            $wrapper
            .find('#modelLib')
            .append( ` 
             <div class="item model" modelId=${model.id} >
                <div class="ui tiny image">
                <img src="${model.img}">
                </div>
                <div class="middle aligned content">
                    <span class="">${model.name}</span> 
                </div>
            </div>`)
        })

        // 板材html
        boardData.forEach( (board) => {
            $wrapper
            .find('#boardLib')
            .append( `
                <div class="item board" boardId=${board.id} >
                    <div class="ui tiny image">
                    <img src="${board.img}">
                    </div>
                    <div class="middle aligned content">
                        <span class="">${board.name}</span> 
                    </div>
                </div>`
                );
        })

    }

    bindCommands (designer ){

        let data = this.data;

        //板材点击事件 
        $("body").on("click",'#libary .board',function(e) {

            let boardData =  _.find(
                data.boardData,
                {
                    'id':parseInt($(this).attr('boardId'))
                }
            );
            // designer.modelControls.beginInsert(designer, boardData)
            designer.execCmd('READY_INSERT_BOARD',boardData);

        })

        // 模型点击
        $("body").on("click",'#libary .model',function(e) {

            // TODO:获取模型数据
            let modelData = _.find(
                data.modelData,
                {
                    'id':parseInt($(this).attr('modelid'))
                }
            );
            let currentModel ={};

            // 判断当前是否有模型，没有则添加，有则转换
             designer.execCmd('GET_CURRENT_MODEL', currentModel =>{
                if(currentModel){
                    designer.execCmd('CHANGE_MODE',modelData);
                }else{
                    designer.execCmd('ADD_MODEL',modelData);
                }

           });

        })



    }
}

export default LibarySidebar;