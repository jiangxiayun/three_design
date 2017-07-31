

import UIComponent from "./UIComponent";
import $ from "jquery";


class TopMenu extends UIComponent {

    constructor ( designer ,data){

        super(designer,data);



    }
    renderDOM(){

        
        super.renderDOM(this.data);


    }

    bindCommands ( cmds ){

    
       
    }
}

export default TopMenu;