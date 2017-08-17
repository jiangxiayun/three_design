import  ScenePopupMenu from "../UI/Scene.Menu.js";



export const addScenePopupMenu = function (designer, position, type){
    let menu = new ScenePopupMenu(designer, position, type);
    return menu;
};

