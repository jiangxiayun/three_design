

import UIComponent from "./UIComponent";
import $ from "jquery";


class BottomMenu extends UIComponent {

    constructor ( designer ,data){

        super(designer,data);



    }
    renderDOM(){

        
        super.renderDOM(this.data);


    }

    bindCommands ( cmds ){

    
       
    }
}

export default BottomMenu;