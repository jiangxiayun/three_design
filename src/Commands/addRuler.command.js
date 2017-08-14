import  BoardHelper from "../View/Helpers/BoardHelper";


const addRulerHelper = (designer ,options) =>{

    let ruler = new BoardHelper(designer, options);
    ruler.joinScene(designer.scene);
    return ruler;
}

export default addRulerHelper;