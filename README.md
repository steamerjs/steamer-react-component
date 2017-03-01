# steamer-react-component

用于开发 `react` 组件的脚手架


## 开发组件规范

* 修改 `package.json` 的相关信息，如果 `name`, `description`, `repository`, `bugs`, `homepage`等
* 在 `src` 目录下进行核心组件代码开发
* 在 `example/src` 目录下，进行 `demo` 的开发，引用src目录下的源码
* 使用 `npm run start` 命令，访问 `localhost:9000` 能访问 `demo`
* 如果想查看具体生成的 `demo` 代码，可以使用 `npm run start.code`
* 开发完毕后，请使用 `npm run dist` 生成可供使用的生产代码
* 在 `README.md` 上写好你的组件文档
* `npm publish` 发布你的组件


## 命令规范

```javascript
// 开发环境，服务器编译
npm start

// 开发环境，生成代码
npm run start.code

// 生产环境
npm run dist

// 测试
npm test

// 检查你的代码是否符合规范
npm run lint
```


## 目录规范

```javascript
dist -- 开发者使用代码
|
src -- 源代码
|
config -- 项目配置
|------project.js -- 项目配置，主要被 webpack，gulp 等使用
|------steamer.config.js -- 可由steamer生成，包括 webserver, cdn, port, route 等
|      |
|      |
tools  -- 构建工具
|      |
|——————start.js -- 开发环境执行命令
|——————start.code.js -- 开发环境生成编译后代码命令
|
package.json
```