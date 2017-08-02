
import BottomMenu from "./Bottom.Menu.js";
import TopMenu from "./Top.Menu.js";
import LibarySidebar from "./Libary.Sidebar.js";
import OptionSidebar from "./Option.Sidebar.js";

class UI {

    constructor(designer ,data , uiSizeData){

        new LibarySidebar(designer ,data.libaryData,uiSizeData.libaryWidth);
        
    }

}

export default UI;
