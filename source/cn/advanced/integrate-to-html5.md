---
title: 集成到 web
type: advanced
order: 6
---

## 项目中引入 html5 版 Weex

### 简介

Weex是一个跨平台可扩展的动态化移动框架，能够真正帮助开发者实现'一次开发，到处运行'。由Weex提供的相关工具进行打包好的bundle文件可以运行在android, ios以及web（这里我们也称之为html5）平台的渲染器上。Weex HTML5是一个专用于在移动端webview以及各种现代浏览器上渲染weex文件的渲染器。
### 获取 Weex HTML5

使用npm安装最新版本的Weex HTML5，并在你的项目中require进来。
#### 从 npm 安装

请确保通过`npm install`或者`npm update`获取Weex HTML5的最新版本npm包。更多关于npm的信息情查阅[npm官方网站](https://docs.npmjs.com/)。

```
npm install weex-html5
```

通过require引入weex-html5:

```
var weex = require('weex-html5')
```

**注意:** 介于Weex目前仍处于开源内测阶段，还没有完全开放源代码，因此`weex-jsframework`可能还没有在npm上发布。当前版本的`weex-html5`包含了`weex-jsframework`，你只需要require `weex-html5`即可暂时在web平台上运行weex代码。建议关注Weex的后续版本发布并做必要的引用方式调整。
### 初始化 Weex

你可以通过Weex暴露的API `init`来初始化一个Weex实例。这个方法需要传递一些配置信息已确定一些环境变量等信息，这些配置信息介绍如下：
- `appId`: Weex实例的id，可以是任意字符串或者数字，并注意不要重复.
- `source`: 请求的Weex bundle文件地址，或者Weex bundle文件代码本身，取决于下面的loader配置.
- `loader`: 加载器类型，用于加载weex bundle，值可以是'xhr', 'jsonp'或者'source'.
  - `xhr`: 通过XMLHttpRequest加载source(即weex bundle的url地址).
  - `jsonp`: 通过JSONP加载weex bundle.
  - `source`: 直接接受weex bundle的代码作为参数.
- `rootId`: root容器的id，默认容器id是'weex'.

以下是一个Weex初始化的示例:

``` javascript
function weexInit() {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page')

  // 需要指定一个jsonp回调函数名称，如果没有则用默认值'weexJsonpCallback'
  var JSONP_CALLBACK_NAME = 'weexJsonpCallback'

  window.weex.init({
    jsonpCallback: JSONP_CALLBACK_NAME,
    appId: location.href,
    source: page,
    loader: loader,
    rootId: 'weex'
  })
}

weexInit()
```
