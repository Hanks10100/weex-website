---
title: Using Vue (Chinses)
type: guide
order: 4.2
version: 2.1
---

# 使用 Vue 开发 Weex 页面

## Vue & Weex 介绍

[Vue.js](https://vuejs.org/) 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 `*.vue` 文件，基于 `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。

![a vue file](//cn.vuejs.org/images/vue-component.png)

Vue.js 在 2016 年 10 月正式发布了 2.0 版本，该版本加入了 Virtual-DOM 和预编译器的设计，使得该框架在运行时能够脱离 HTML 和 CSS 解析，只依赖 JavaScript；同时 Virtual-DOM 也使得 Vue 2.x 渲染成原生 UI 成为了可能。

[Weex](https://weex-project.io/) 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。 Weex 与 Vue 有官方合作，支持将 Vue 2.x 作为内置的前端框架，Vue 也借此具备了开发原生应用的能力。

## 尝鲜体验

 > 开始之前，希望你能对 Weex 和 Vue 有基本的了解，推荐阅读 [Weex Tutorial](../index.html) 和 [Vue Introduction](https://vuejs.org/v2/guide/) 了解更多信息。

~~如果你想尝鲜体验一下用 Vue 写原生应用，可以在 [dotWe](http://dotwe.org) 中写示例代码，通过我们的 [Playground App](https://weex-project/playground.html) 扫码就可以查看原生渲染效果。~~

~~这里有一个 [Hello World](http://dotwe.org/033445af80eaf097d7f8efd11e6e04dc) 的例子。~~

### 快速创建项目

Weex 官方提供了 [weex-toolkit](https://github.com/weexteam/weex-toolkit) 的脚手架工具来辅助开发和调试。

首先安装 `weex-toolkit` 工具：

```bash
npm install weex-toolkit -g
```

> weex-toolkit 从 0.x.x 版本开始才支持初始化 Vue 项目，使用前请确认版本是否正确。

然后初始化 Weex 项目：

```bash
weex init vue awesome-project
```

 > 注：使用 [vue-cli](https://github.com/vuejs/vue-cli) 也可以初始化 Weex 的项目：
 > `vue init weex awesome-project`

执行完命令后，在 `awesome-project` 目录中就创建了一个使用 Weex 和 Vue 的模板项目。生成的项目结构可以参考 [weex-vue-template](https://github.com/weexteam/weex-vue-template) 中的说明文档。

### 预览和调试

> 学习一些开发原生应用的基础知识，会对你开发 Weex 项目很有帮助。

#### 在 Web 中启动项目

首先执行 `npm install` 安装依赖，然后执行 `npm run start`，会编译源码文件，并且启动本地 Web 服务，监听 12580 端口。在浏览器中打开 `http://localhost:12580` 即可预览 Web 页面。

#### 启动 Android 项目

Android 项目在生成在 `android` 目录中，是一个标准的 [Android Studio](https://developer.android.com/studio/index.html) 项目。在启动之前需要安装 Android Studio 和必要的 Android SDK，配置好基本的开发环境。

如果开发环境已经准备就绪，直接使用 Android Studio 打开 `android` 目录中的项目，即可启动模拟器或者真机预览页面。

#### 启动 iOS 项目

首先应该配置好 [iOS 开发环境](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) 并且安装 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html) 工具。

进入 `ios` 目录，使用 CocoaPods 安装依赖：

```
pod install
```

依赖安装成功后，使用 Xcode 打开 `ios` 目录中的项目，即可启动模拟器预览页面。

> 注：如果想在真实的 iOS 设备上查看效果，还需要配置开发者签名等信息。

#### 调试

如果你已经掌握了原生应用的调试技巧，Weex 项目和其他原生项目并没什么不同，这些技巧依然可以用于调试 Weex 的项目。

此外， `weex-toolkit` 针对 Vue 2.x 做了适配，支持在 Native 渲染层调试 Vue 2.x 项目。想了解更多调试技巧，可以参考 [weex-toolkit](https://github.com/weexteam/weex-toolkit) 中的说明文档。

### 编写代码

在创建了项目并且配置好了开发环境之后，我们就可以开始写代码了。

虽然开发的是原生应用，但是代码写起来和 Web 中并没什么不一样，你可以选择自己喜欢的前端开发环境、可以写 `.vue` 文件、也可以直接写 javascript 文件、可以使用 ES6+ 、可以使用发布在 npm 上的模块、可以扩展 Weex 的组件或者模块。

#### 使用其他工具库

Vue.js 也有较多周边技术产品，如 [Vuex](https://github.com/vuejs/vuex) 和 [vue-router](https://github.com/vuejs/vue-router) 等，这些库也可以在 Weex 中很好的工作。

我们基于 Weex 和 Vue 开发了一个的完整项目 [weex-hackernews](https://github.com/weexteam/weex-hackernews) ，引入了包含 Vue 2.x 的 WeexSDK，创建了三端的项目和基本的编译配置。在项目中使用了 Vuex 和 vue-router ，能够实现同一份代码，在 iOS、Android、Web 下都能完整地工作。

#### 扩展 Weex 的组件和模块

Weex 内置了一些通用的组件和模块，可以满足基本上使用需求。为了控制 SDK 的体积和保持框架的通用性，我们会谨慎地选择内置的组件和模块，并不会包罗万象将所有功能都封装进 SDK。不过我们提供了额外的组件市场，在其中将能找到满足不同需求、各式各样的组件和模块，此外 Weex 也具备横向扩展的能力，开发者可以自行定制和扩展 Weex 组件和模块。

## Vue 2.x 在 Weex 中的特色功能

我想，你一定对 **Vue 为什么能渲染成原生页面** 、**Weex 为什么能将内核切换成 Vue** 心存好奇。如果你对这些细节感兴趣，可以阅读这篇文章 ~~[《how it works》](./index.html)~~

### 流式渲染

在 Weex 中，我们可以通过 `<foo append="tree|node">` 的方式定义页面首次渲染时的渲染颗粒度，这让开发者有机会根据界面的复杂度和业务需求对首次渲染过程进行定制。`append="tree"` 表示整个结点包括其所有子结点全部生成完毕之后，才会一次性渲染到界面上；而 `append="node"` 则表示该结点会先渲染在界面上作为一个容器，其子结点会稍后做进一步渲染。

<!-- dotwe demo -->

### 表单控件绑定

在 Weex 中，我们针对 `<input>` 和 `<textarea>` 这两个表单控件提供了和 web 体验相同的 `v-model` 指令。通过 `<input v-model="message">` 或 `<textarea v-model="message">`，开发者可以把数据 `message` 的值自动展示在文本框上，同时用户修改了文本框的值的时候，数据 `message` 会自动被更新。

<!-- dotwe demo -->

### 多页面上下文隔离

如 Weex 工作原理文中所述，所有 Weex 的 JS bundle 公用一个 JavaScript 内核实例。所以如何能够让多个 JS bundle 中使用的 Vue 是完全隔离的，并且其中一个页面对 Vue 进行扩展或改写不会影响到其它页面就变成了一个问题，通过 Weex 和 Vue 双方的协作，这一问题已经得以解决。大家可以放心使用。

<!-- html5 apis -->

### `<transition>` 过渡状态

Weex 支持了 Vue 2.x 中经典的 `<transition>` 写法，开发者可以通过 `<transition>` 轻松定义一个界面在两种状态中的过渡方式。

## 在 Weex 中使用 Vue 的注意事项

Vue.js 最初是为 Web 设计的，虽然可以基于 Weex 开发移动应用，但是 Web 开发和原生开发毕竟不同，在功能和开发体验上都有一些差异，这些差异从本质上讲是原生开发平台和 Web 平台之间的差异，Weex 正在努力缩小这个差异的范围。

参考文章[《Vue 2.x 在 Weex 和 Web 中的差异》](../../references/vue/index.html)了解存在差异的原因和细节。
