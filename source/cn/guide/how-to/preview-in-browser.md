# 如何在浏览器中预览？

我们强烈建议你使用 `weex-toolkit` 在浏览器中预览 Weex 代码。`weex-toolkit` 是 Weex 团队开发的一款命令行工具，可以通过简单的命令编译 `.we` 文件并开启静态服务器供你在浏览器或客户端中预览 Weex 页面。

## 安装依赖

如果你已经成功安装 `weex-toolkit` ，那么你可以跳过本节。

首先，你需要 Node.js 和 `weex-toolkit`。

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

## 预览

假如一切运行正常，终端导航到你想预览的 `xxx.we` 所在目录，输入命令:

```bash
weex xxx.we
```

浏览器窗口将会自动打开，显示你想预览的页面：

![preview page](https://img.alicdn.com/tps/TB1j4XtOFXXXXaJXXXXXXXXXXXX-800-570.jpg)
