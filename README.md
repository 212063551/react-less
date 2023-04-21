# react + less  的脚手架开发

项目基于 react18 + less + webpack 5
### 第一步 

克隆当前仓库

### 第二步

安装依赖 ` npm install | yarn `

### 第三步

执行 ` yarn dev | npm run dev `

### 结果

在浏览器手动输入： [http://localhost:8080](http://localhost:8080/)。

你将看到页面中间出现 hello React，接下来您可以愉快的开发了。


注意事项： 

#### 命令

``` js

dev	// 此命令用于日常开发
build	// 此命令用于生产打包
build:analy	// 此命令会在浏览器打开打包分析的页面
pre-check	// 此命令会校验暂存区的格式 
eslint	// 此命令会校验src下的ts,tsx等代码是否符合eslint
cz	// husky配合commitizen 实现代码提交规范

```

#### 关于 CSS Modules 的使用
```js
// 项目默认开启 CSS Modules,需要可在 config/webpack.common.js 注释以下代码。
modules: {
	localIdentName: "[local]-[hash:base64:5]",
},

```
	
## bug

项目目前存在的问题： 在webapck5，如果使用局域网开发，默认打开浏览器显示 ：http://0.0.0.0,这个在 windows中无法打开。如果您有更好的方案欢迎交流讨论。
