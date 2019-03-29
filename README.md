# 初始项目
本项目意在初始化一个拥有基本调试功能，服务器端渲染的库  

## 环境变量
IS_DEV 是否是开发环境('true')  
IS_SSR 是否开启开启服务器端渲染('true')  

## 项目配置说明
主要的配置在config中，包含了服务器配置（app.config.js）和各种情况下的webpack配置  
在服务器配置中：  
1.SSR用来设置当前是否开启Server Side Render（服务器端渲染）  
2.PORT是使用什么端口来运行静态资源服务（或渲染服务）  
注：其他配置请勿改动  
注：在./client/preset中的config文件只是服务器端运行的代码的配置项  

## 项目运行说明  
先运行：npm i  
开发环境运行：npm start 或 node ./server/dev.js  
生产环境运行：npm prod 或 node ./server/index.js  
打包APP运行：npm build 或 node ./server/build.js  

## 项目基本配置

路由 react-router-dom
可预测状态容器 mobx mobx-react
样式  sass 
UI仓库 antd 