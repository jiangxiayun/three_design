


目录说明：

├─dist                      生产环境文件
├─mock                      数据模拟文件
│      boardList.json
│      modelList.json
│      
├─src                       源码
│  │  App.js                App类
│  │  Designer.js           Designer类
│  │  entry.js              入口文件
│  │  
│  ├─assets                 非编译目录
│  ├─Commands               命令目录
│  │      
│  ├─Config                 配置文件目录
│  │      
│  ├─Controls               交互Controls目录
│  │  
│  ├─Helpers                帮助工具类目录
│  │      History.js            历史栈类
│  │      Stroage.js            本地存储类
│  │      
│  ├─Http                   数据交互目录
│  │      dataService.js    
│  │      
│  ├─Loaders                加载器loader目录
│  │      OBJLoader.js
│  │      
│  ├─Objects                对象类
│  │      Board.js              板材对象基类
│  │      HorizontalBoard.js    横板类
│  │      Model.js              模型类
│  │      SideBoard.js          侧板类
│  │      VerticalBoard.js      竖板类
│  │      
│  ├─UI                     视图dom层目录
│  │      Bottom.Menu.js        底部菜单栏
│  │      index.js              
│  │      Libary.Sidebar.js     模型板材库侧边栏
│  │      Option.Sidebar.js     板材参数侧边栏
│  │      Top.Menu.js           顶部菜单栏
│  │      UIComponent.js        视图组件基类
│  │      
│  └─View                   视图webgl渲染层
│      │  index.js
│      │  Viewport.js       render
│      │  
│      └─Helpers            视图helper辅助对象目录
│              BoardHelper.js
│              ModelHelper.js
│              
└─static    静态资源目录




使用：
    安装  npm install 
    开发  npm run dev 
    打包  npm run build
 
            
