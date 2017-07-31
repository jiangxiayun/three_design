
import $ from "jquery";

class UIComponent {

    constructor(designer , data = null){

        this.data = data;
        this.$wrapper = null;

    }
    renderDOM(data){

    }
    bindCommand(){

    }
    appendToView(){
        $("body").append(this.$wrapper);
    }
}

export default UIComponent;