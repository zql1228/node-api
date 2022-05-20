1 npm 初始化
npm init -y
生成 package.json 文件
2 git 初始化
git init
生成.git 隐藏文件夹
3 创建 ReadMe 文件
二、搭建项目
1 按装 Koa 框架
npm i koa 2.编写最基本的 app
创建 src/main.js
代码粘贴
三、项目的基本优化
1 自动重启服务
安装 nodemon 工具
npm i nodemon
2 读取配置文件
安装 dotenv 读取更目录中的.env 文件,将配置写 process.env 中
npm i dotenv
创建.env 文件
四、添加路由
1 安装 koa-router
npm i koa-router
步骤 1.导入包

五、目录结构优化 1.将 http 服务和 app 业务拆分 2.将路由和控制器拆分
路由：解析 url,分布给控制器对应的方法
控制器:控制不同的业务
