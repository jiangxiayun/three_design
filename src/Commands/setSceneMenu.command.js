import  ScenePopupMenu from "../UI/Scene.Menu.js";



export const addScenePopupMenu = function (designer, position, type, action){
    let menu = new ScenePopupMenu(designer, position, type, action);
    return menu;
};

