# 如何在 app 中预览 Weex 页面？

## 第一步：安装依赖

你需要安装 Node.js 和 `weex-toolkit`。如果你已经安装过，可跳过此步。

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

通常，安装了 Node.js 环境，npm 包管理工具也随之安装了。因此，直接使用 npm 来安装 `weex-toolkit`。

> npm 是一个 JavaScript 包管理工具，它可以让开发者轻松共享和重用代码。Weex 很多依赖来自社区，同样，Weex 也将很多工具发布到社区方便开发者使用。

```bash
$ npm install -g weex-toolkit    
```	  

国内开发者可以考虑使用淘宝的 npm 镜像 —— [cnpm](https://npm.taobao.org/) 安装 `weex-toolkit`

```bash
$ npm install -g cnpm
$ cnpm install -g weex-toolkit
```

*提示：*

如果提示权限错误（*permission error*），使用 `sudo` 关键字进行安装

```bash
$ sudo cnpm install -g weex-toolkit
```

安装结束后你可以直接使用 `weex` 命令验证是否安装成功，它会显示 `weex` 命令行工具各参数：

![](https://img.alicdn.com/tps/TB1kHFrOFXXXXaYXXXXXXXXXXXX-615-308.jpg)

## 第二步：使用 Playground 预览

使用 [Playground APP](https://alibaba.github.io/weex/download.html) 预览是最简单的方式。你只需要在手机上安装 [Playground](https://alibaba.github.io/weex/download.html)。

我们用 `weex-toolkit` 编译 `.we` 文件并开启静态服务器：

```bash
$ weex demo.we --qr
```

![](https://img.alicdn.com/tps/TB1a4OaLpXXXXbAaFXXXXXXXXXX-782-649.jpg)

终端会生成一个二维码，我们只需用 Playground 扫码即可预览。

## 构建一个全新的 App 并预览

这里可参考[《如何创建一个 Weex 项目》](https://alibaba.github.io/weex/cn/doc/how-to/create-a-weex-project.html)。
