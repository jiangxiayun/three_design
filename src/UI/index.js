
import BottomMenu from "./Bottom.Menu.js";
import TopMenu from "./Top.Menu.js";
import LibarySidebar from "./Libary.Sidebar.js";
import OptionSidebar from "./Option.Sidebar.js";

import $ from "jquery";


class UI {

    constructor(designer ,data , uiSizeData){

        new LibarySidebar(designer ,data.libaryData,uiSizeData.libaryWidth);
        new BottomMenu(designer);

        // 绑定命令
        this.bindCommands(designer);
    }

    bindCommands ( designer ) {
        $('div, div *').on('mousedown', function () {

            // 移除场景弹窗菜单
            if(designer.popup){
                designer.execCmd('REMOVE_SCENE_MENU');
            }

        });
    }
}

export default UI;
