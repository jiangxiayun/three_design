

import './assets/vendor/semantic';
import Designer from "./Designer.js";


import View from "./View";
import Commands from "./Commands";
import UI from "./UI";
import Controls from "./Controls";


import uiSize  from "./Config/uiSize.config";


import { getBoards , getModels} from "./Http/dataService";

class App {

    constructor(){
        this.version = "0.0";
        this.author = 'yt';
        this.name = '设计软件';
    }

    run(){
        

        // 获取初始数据
        Promise.all([

            getBoards(),
            getModels()

        ]).then((res) =>{
            
            // 提取数据
            let data = {

                libaryData : {

                    modelData : res[1].data,
                    boardData : res[0].data
                    
                }
            }

            // 初始化designer
            const designer = new Designer(uiSize.panelSize.width , uiSize.panelSize.height);


            // 初始化各组件模块

            // 初始化视图
            new View(designer,uiSize.panelSize);

            // 挂载命令
            new Commands(designer);

            // 初始化controls
            new Controls(designer);

            // 初始化 UI
            new UI(designer ,data ,uiSize);
        })

    }
}

export default App;