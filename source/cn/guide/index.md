---
title: 快速上手
type: guide
order: 1
version: 2.1
has_chapter_content: true
---

#Get started

Vue.js 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 *.vue 文件，基于  `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。本章会教你如何搭建本地开发环境进行 Weex 开发。

开始之前，希望你能对 Weex 和 Vue 有基本的了解，推荐阅读 Weex Tutorial 和 Vue Introduction 了解更多信息。

## 第一步：安装依赖

Weex 官方提供了 weex-toolkit 的脚手架工具来辅助开发和调试。首先，你需要 Node.js 和 weex-toolkit。

安装 Node.js 方式多种多样，最简单的方式是在 [Node.js 官网](https://nodejs.org/en/) 下载可执行程序直接安装即可。

对于 Mac，可以使用 [Homebrew](http://brew.sh/) 进行安装：

```bash
brew install node
```

> 更多安装方式可参考 [Node.js 官方信息](https://nodejs.org/en/download/)

安装完成后，可以使用以下命令检测是否安装成功：

```bash
$ node -v
v6.3.1
$ npm -v
3.10.3
```

通常，安装了 Node.js 环境，npm 包管理工具也随之安装了。因此，直接使用 npm 来安装 weex-toolkit。

> npm 是一个 JavaScript 包管理工具，它可以让开发者轻松共享和重用代码。Weex 很多依赖来自社区，同样，Weex 也将很多工具发布到社区方便开发者使用。

**注意: ** weex-toolkit 目前仅有最新的 beta 版本开始才支持初始化 Vue 项目，使用前请确认版本是否正确。

```bash
$ npm install -g weex-toolkit@beta
```	  

国内开发者可以考虑使用淘宝的 npm 镜像 —— [cnpm](https://npm.taobao.org/) 安装 weex-toolkit

```bash
$ npm install -g cnpm
$ cnpm install -g weex-toolkit@beta
```

*提示：*

如果提示权限错误（*permission error*），使用 `sudo` 关键字进行安装

```bash
$ sudo cnpm install -g weex-toolkit@beta
```

安装结束后你可以直接使用 `weex` 命令验证是否安装成功，它会显示 `weex` 命令行工具各参数：

![](https://img.alicdn.com/tps/TB1kHFrOFXXXXaYXXXXXXXXXXXX-615-308.jpg)

## 第二步：初始化

然后初始化 Weex 项目：

```bash
$ weex init vue awesome-project
```

> 注：使用 `vue-cli` 也可以初始化 Weex 的项目：
> `vue init weex awesome-project`

执行完命令后，在 `awesome-project` 目录中就创建了一个使用 Weex 和 Vue 的模板项目。生成的项目结构可以参考 [`weex-vue-template`](https://github.com/weexteam/weex-vue-template) 中的说明文档。

## 第三步：开发

之后我们进入项目所在路径，weex-toolkit 已经为我们生成了标准项目结构。

在 `package.json` 中，已经配置好了几个常用的 npm script，分别是：

- `build`: 源码打包，生成 JS Bundle
- `dev`: webpack watch 模式，方便开发
- `serve`: 开启静态服务器
- `debug`: 调试模式

我们先通过 `npm install` 安装项目依赖。

