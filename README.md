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

### 逻辑组件注意事项

逻辑组件开发时，可能并不需要具体 `demo`，这时，测试的一些文件（非测试用例文件），可放在 `example` 或者 `__tests__` 中。

由于脚手架自带 `babel-jest` 依赖，运行测试的时候会帮你自动编译好源码。因此可以在测试的时候直接引用 `src` 中的源码，测试结果与引用 `dist` 中的生产环境代码无二。

- 示例：[pure-render-deepCompare-decorator](https://github.com/SteamerTeam/pure-render-deepCompare-decorator)

### UI组件注意事项

UI组件开发的时候，往往需要同时开发具体的 `demo` 供测试，或者调试。这时候，使用后面会说到的 `npm start` 等开发命令，能够启动一个服务器，帮助你通过页面进行调试或测试。如果你想查看具体开发时候的代码，可以使用 `npm run start.code`。


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