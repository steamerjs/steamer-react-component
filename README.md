# steamer-react-component

用于开发 `react` 组件的脚手架

## 如何使用

* 直接从github clone 下来
* 使用[steamerjs](https://github.com/SteamerTeam/steamerjs)安装

```javascript
// 安装依赖
npm i

// 开发
npm start 或 npm run dev
// 打开链接，查看 demo
localhost:9000

// 查看开发环境源码
npm run source

// 代码规范安装
npm i -g eslint
npm i -g stylelint
// 代码规范扫描
npm lint

// 测试
npm run test

// 生产代码生成
// 使用 babel 编译
npm run dist
// 使用 webapck 编译
npm run webpack

```

## 开发组件规范

* 修改 `package.json` 的相关信息，如果 `name`, `description`, `repository`, `bugs`, `homepage`等
* 在 `src` 目录下进行核心组件代码开发
* 在 `example/src` 目录下，进行 `demo` 的开发，引用src目录下的源码
* 使用 `npm run start` 命令，访问 `localhost:9000` 能访问 `demo`
* 如果想查看具体生成的 `demo` 代码，可以使用 `npm run start.code`
* 开发完毕后，请使用 `npm run dist` 生成可供使用的生产代码
```javascript
注意，目前 npm run dist 其实是运行了 npm run babel，表示是直接使用 babel 帮助你进行编译。

如果你想要使用 webpack帮你编译并且打包，尤其是需要将组件编译成 umd 模式，请将 npm run dist 的命令内容改为 npm run webpack。

另外，在在使用 webpack编译打包的时候，有时引用库你并不想打包到你的组件里面。

那么，请在 webpack.babel.js 配置文件里设置 external 参数，这样 webapck 就不会帮你将这些 external 的库打包进组件里面。
```
* 在 `README.md` 上写好你的组件文档
* `npm publish` 发布你的组件

### 逻辑组件注意事项

逻辑组件开发时，可能并不需要具体 `demo`，这时，测试的一些文件（非测试用例文件），可放在 `example` 或者 `__tests__` 中。

由于脚手架自带 `babel-jest` 依赖，运行测试的时候会帮你自动编译好源码。因此可以在测试的时候直接引用 `src` 中的源码，测试结果与引用 `dist` 中的生产环境代码无二。

- 示例：[pure-render-deepCompare-decorator](https://github.com/SteamerTeam/pure-render-deepCompare-decorator)

### UI组件注意事项

UI组件开发的时候，往往需要同时开发具体的 `demo` 供测试，或者调试。这时候，使用后面会说到的 `npm start` 等开发命令，能够启动一个服务器，帮助你通过页面进行调试或测试。如果你想查看具体开发时候的代码，可以使用 `npm run start.code`。

对UI组件进行测试的时候，除了[jest](https://github.com/facebook/jest)之外，还需要到 `Airbnb` 开发的 [enzyme](https://github.com/airbnb/enzyme)，方便进行 `react` 组件的渲染、搜索等，可能还需要到 [jsdom](https://github.com/tmpvar/jsdom) 和[jest-environment-jsdom](https://github.com/facebook/jest/tree/master/packages/jest-environment-jsdom) 帮你注入全局 `window`。除此之外，你可能想不测某式内容，例如样式等，你可以在 __mocks__ 文件夹中，放一个 `styleMock.js` 文件，用于虚构样式文件。详细可以参考下面的例子。

- 示例：[react-list-scroll](https://github.com/SteamerTeam/react-list-scroll)

## Karma 测试
```shell
npm run karma
```


## 命令规范

```javascript
// 开发环境，服务器编译
npm start 或者 npm run dev

// 开发环境，生成代码
npm run start.code

// 生产环境
npm run dist

// 测试
npm test

// 测试覆盖轨
npm run coverage

// 检查你的代码是否符合规范
npm run lint
```


## 目录规范

```javascript
__tests__ -- 测试用例
|
example -- 真实demo
|
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
|
|
|——————script.js -- 开发环境的执行命令
|——————server.js -- 开发环境服务器
|——————webpack.babel.js -- 使用 webpack 进行编译的配置
|——————webpack.example.js -- 开发环境demo配置
|
.babelrc 使用 babel 进行编译的配置
package.json
```