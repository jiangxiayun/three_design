

import UIComponent from "./UIComponent";
import $ from "jquery";


/**
 * 
 *右侧参数栏 
 * @class OptionSidebar
 * @extends {UIComponent}
 */
class OptionSidebar extends UIComponent {

    constructor ( designer ,data){

        super(designer,data);

        this.uiWidth = data.uiWidth;

        // 初始化wrapper
        this.$wrapper = $('<ul id ="option"  class="ui form segment"></ul>')
                        .css('width',data.uiWidth)
                       

        this.renderDOM();


        // 绑定命令
        this.bindCommands(designer);

        // 将dom添加到视图中
        super.appendToView();



    }

    getData(){
        return {
            size : {
                width : this.$wrapper.find('[name=width]').val(),
                height : this.$wrapper.find('[name=height]').val(),
                depth : this.$wrapper.find('[name=depth]').val()
            },
            position : {
                x : this.$wrapper.find('[name=posX]').val(),
                y : this.$wrapper.find('[name=posY]').val(),
                z : this.$wrapper.find('[name=posZ]').val()
            },
            rotation : {
                x : this.$wrapper.find('[name=rotX]').val(),
                y : this.$wrapper.find('[name=rotY]').val(),
                z : this.$wrapper.find('[name=rotZ]').val()
            }
        }
    }

    /**
     * 渲染dom
     * 
     * @memberof OptionSidebar
     */
    renderDOM(){

        this
        .$wrapper
        .append(`
            <div class="field">
                <label> 宽度：</label>
                <input name='width' type='number' value='' />
            </div>
            <div class="field">
                <label>长度：</label>
                <input name='height'type='number' value='' />
            </div>
            <div class="field">
                <label>厚度：</label>
                <input name='depth' type='number' value='' />
            </div>
            <div class="field">
                <label>坐标X：</label>
                <input name='posX' type='number' value='' />
            </div>
            <div class="field">
                <label> 坐标Y：</label>
                <input name='posY' type='number' value='' />
            </div>
            <div class="field">
                <label>坐标Z：</label>
                <input name='posZ' type='number' value='' />
            </div>
            <div class="field">
                <label> 旋转X：</label>
                <input name='rotX' type='number'  prop='rotation' value='' />
            </div>
            <div class="field">
                <label>旋转Y：</label>
                <input name='rotY' type='number' prop='rotation' value='' />
            </div>
            <div class="field">
                <label> 旋转Z：</label>
                <input name='rotZ' type='number'  prop='rotation' value='' />
            </div>
            <div class="field">
                <label> 交互模式</label>
                <div class="ui buttons">
                    <button class="ui button active positive mode" id='inputMode' mode='input'>键盘</button>
                    <div class="or"></div>
                    <button class="ui  button mode" id='controlMode' mode='controls'>鼠标</button>
                </div>
            </div>
                <div class="field">
                <div class="ui primary button" id="changeTexture">修改板材纹理</div>
            </div>


            <div class="ui longer test modal transition hidden" style="margin-top: -387.25px;z-index:10" >
                <div class="header">
                    请选择板材纹理
                </div>
                <div class="ui grid" style='margin:0'>
                    <div class="ui medium eight wide column ">
                        <h3>当前板材</h3>
                        <img src="/images/wireframe/image.png" id='currentTexture' style='width:200px'>
                    </div>
                    <div class="eight wide column ui items" id='textures' >
                        <div class="ui header">板材列表</div>
                    </div>
                </div>
                <div class="actions">
                <div class="ui primary approve button">
                    关闭
                </div>
                </div>
            </div>
        `)
        .hide(); 
        
    }


    /**
     * 
     * 展示板材数据
     * @param {any} boardObj 
     * @memberof OptionSidebar
     */
    show(boardObj) {


        let board = boardObj.obj;

        this.uuid = board.uuid;
        let size = {
            width : board.geometry.parameters.width * board.scale.x,
            height : board.geometry.parameters.height * board.scale.y,
            depth : board.geometry.parameters.depth * board.scale.z,
        }

        let position = board.position;
        let rotation = board.rotation;


        let data = {
            width : size.width,
            height : size.height,
            depth : size.depth,
            posX : position.x,
            posY : position.y,
            posZ : position.z,
            rotX : rotation.x / Math.PI * 180,
            rotY : rotation.y / Math.PI * 180,
            rotZ : rotation.z / Math.PI * 180,
        }
        this.data = {
            size,
            position,
            rotation
        }

        // 获取所有input框 并显示当前的板材数据
         this
            .$wrapper
            .find('input')
            .each( (index,inputDom) => {
                let $input = $(inputDom);
                $input.val(data[$input.attr('name')])
            });

        // 显示
        this
            .$wrapper
            .show();
                
    }

    /**
     * 绑定命令
     * 
     * @param {any} designer 
     * @memberof OptionSidebar
     */
    bindCommands ( designer ){
        let scope = this;
        let cmds = designer.cmds;

        // 添加隐藏参数面板命令
        cmds.HIDE_BOARD_OPTIONS.add( () => {
            scope
                .$wrapper
                .hide();
        })

        // 添加展示参数面板命令
        cmds.SHOW_BOARD_OPTIONS.add( (board) => {
            console.log('ss')
            scope.
                show(board);
        })
        

        // 参数面板修改事件
       scope
        .$wrapper
        .find('input')
        .on('change',function(e){
            let valueName = $(this).attr("name");
            console.log(valueName)
            let type = '',
                data = {} ;
            if(_.indexOf(['width','height','depth'],valueName) != -1){
                console.log('size');
                type = 'size';
                data = scope.getData().size;

            }else if(_.indexOf(['posX','posY','posZ'],valueName) != -1){
                console.log('position');
                type = 'position'
                data = scope.getData().position;

            }else if(_.indexOf(['rotX','rotY','rotZ'],valueName) != -1) {
                console.log('rotation');
                type = 'rotation'
                data = scope.getData().rotation;
            }
            designer.execCmd('SET_BOARD',{
                type,
                data 
            })
        })
       
    }

}

export default OptionSidebar;