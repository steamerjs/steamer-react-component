# steamer-react-component

用于开发 `react` 组件的脚手架


## 快速启动

* 推荐 >> 使用[steamerjs](https://steamerjs.github.io/steamerjs/docs/How-To-Start.html)安装
* 或直接从github clone 下来

### 安装依赖
```bash
npm i
```

### 开发

```bash
npm run start 或 npm run dev

// 打开链接，查看 demo
localhost:9000
```

> ps：此处在开启开发模式下默认会自动打开浏览器。

### 代码规范扫描

```bash
npm run lint
```

> ps：此处的扫描在开发模式下是默认开启的，不需要手动执行lint。

### 测试

```bash
// 使用 jest 测试
npm run test 或 npm run jest

// 使用 karma 测试
npm run karma
```

### 生产代码生成

```bash
// 使用 babel 编译
npm run dist 或 npm run babel

// 使用 webapck 编译
npm run webpack
```

> ps：关于两种测试方式和两种编译方式的区别可查看[这里](https://steamerjs.github.io/steamerjs/docs/Componet-Standard.html#两种编译与两种测试方式)。

## 编写demo

直接在`/example/src/container/`目录下调整关于组件的使用逻辑和范例样式即可，如范例中该目录下的index.js和index.less文件。


## 详细文档
[参见文档 - 组件脚手架](https://steamerjs.github.io/steamerjs/docs/Component-Starterkit.html)

## 文章参考
* [从工程化角度讨论如何快速构建可靠React组件](https://github.com/lcxfs1991/blog/issues/18)
* [聊一聊前端自动化测试](https://github.com/tmallfe/tmallfe.github.io/issues/37)
