---
title: Vue 2.x 在 Weex 和 Web 中的差异
type: references
order: 4
version: 2.1
has_chapter_content: false
chapter_title: Vue
---


# Vue 2.x 在 Weex 和 Web 中的差异

## 平台差异

Vue.js 最初是为 Web 平台设计的，虽然可以基于 Weex 开发原生应用，但是 Web 开发和原生开发毕竟不同，在功能和开发体验上都有一些差异，这些差异从本质上讲是原生开发平台和 Web 平台之间的差异，Weex 正在努力缩小这个差异的范围。

### 原生组件并不是 DOM

DOM（Document Object Model），即文档对象模型，是 HTML 和 XML 文档的编程接口，是 Web 中的概念。Weex 的运行环境以原生应用为主，在 Android 和 iOS 环境中渲染出来的而是原生的组件，没有 DOM 。因此也就不支持 DOM 操作，不支持选择器，当然也不支持基于 DOM API 的程序库（如 jQuery）。

#### DOM 事件

Weex 支持在标签上绑定事件，写法和在 Web 中使用 Vue 一模一样。需要注意的是，Weex 中的事件是由原生组件捕获并触发的，行为和 Web 中有所不同，事件中的属性也有 Web 中有差异。

+ 并不支持 Web 中所有的事件类型，详情参考[通用事件的文档](../common-event.html)。
+ 不区分事件的捕获阶段和冒泡阶段，相当于 DOM 0 级事件。
+ 不支持 `.prevent` 、`.capture` 、`.stop` 、`.self` 等事件修饰符。
+ 键盘事件的 `.{keyCode | keyAlias}` 修饰符在原生环境中无意义。

#### 不支持 Vue 中与 DOM 相关的语法

Vue 中与 DOM 相关的接口或者属性，将无法在 Native 环境中使用：

+ 无法通过 `vm.$el` 获取界面元素。
+ 无需自行调用 `vm.$mount`。
+ 不支持 `v-html` 属性。

### 原生环境中没有 BOM

BOM（Browser Object Model），即浏览器对象模型，是浏览器环境为 javascript 提供的接口。Weex 在原生端没有并不基于浏览器运行，不支持浏览器提供的 BOM 接口。

#### 没有 `window` 、`screen` 对象

Weex 中并未提供浏览器中的 `window` 和 `screen` 对象，不支持使用全局变量。如果是想要获取设备的屏幕或环境信息，可以使用 `WXEnvironment` 变量。

+ `WXEnvironment`
  + `weexVersion`: WeexSDK 的版本。
  + `appName`: 应用的名称。
  + `appVersion`: 应用的版本。
  + `platform`: 运行平台，可能的值是 `Web` 、`Android` 、`iOS` 之一。
  + `osName`: 系统的名称。
  + `osVersion`: 系统版本。
  + `deviceWidth`: 设备宽度。
  + `deviceHeight`: 设备高度。

#### 没有 `document` 对象

在浏览器中 `document` 表示了当前活动的文档模型，在 Android 和 iOS 环境中并没有这个对象，也不支持与其相关的 DOM 操作。

#### 没有 `history` 、`location` 、`navigator` 对象

+ `history` 保存了当前页面的历史记录，并且提供了前进后退操作。
+ `location` 记录了当前页面 URL 相关的信息。
+ `navigator` 记录了当前浏览器中的信息。

这些接口与浏览器自身的实现有关，可以控制页面的前进后退并且获取状态信息。虽然在 Android 和 iOS 中也有“历史”和“导航”的概念，但是它是用于多个管理视图之间的跳转的。换句话说，在浏览器中执行“前进”、“后退”仍然会处于同一个页签中，在原生应用中“前进”、“后退”则会真实的跳转到其他页面。

此外 Weex 也提供了 `navigator` 模块来操作页面的跳转，使用方法参考其[文档](../modules/navigator.html)。

### ~~能够调用移动设备原生 API~~

~~原生应用中能够调用移动设备原生 API，如 clipboard 、 navigator 、geolocation 等。使用方法是通过注册、调用模块来实现。~~

~~有些接口在浏览器中也存在，不过在使用时应该注意浏览器的兼容性；如剪贴板功能，出于安全性考虑，绝大多数浏览器都限制其使用。~~

## 功能差异

### 仅引入了 Vue Runtime

Vue 除了提供默认的完整包以外，还提供一个更小巧的 `vue.runtime.js`，在这个文件中移除了模板编译的相关操作，Weex 中也仅引入 Vue Runtime 的功能，这样做除了可以减少代码体积以外，还能减少运行期编译模板的负担，提升性能。

具体的差异有：

+ 定义组件时不支持 `template` 属性。
+ 不支持使用 `x-templates`。
+ 不支持使用 `Vue.compile`。

### 隔离多页面的作用域

Weex 在原生端使用的是“多页”的实现，不同的 js bundle 将会在不同的原生页面中执行；也就是说，不同的 js bundle 之间将不同共享 js 变量。即使是 `Vue` 这个变量，在不同页面中也对应了不同的引用。

基于这个特性，Vue 中全局功能将只在当前页面内生效：

+ `Vue.config`
+ `Vue.component`
+ `Vue.directive`
+ `Vue.filter`
+ `Vue.mixin`
+ `Vue.use`

> 注：以上接口的功能并未受影响，只是其生效范围将会限制在同一页面内。

## 样式差异

Web 中的 CSS 非常的灵活，积累了特别多的属性，支持多种布局方法；这是其优势，也是浏览器性能优化的一个瓶颈。

Weex 中的样式是由原生渲染器解析的，出于性能和功能复杂度的考虑，Weex 对 CSS 的特性做了一些取舍，使其更符合最佳实践。

### 单类名选择器和作用域

Weex 中只支持单个类名选择器，不支持关系选择器，也不支持属性选择器。

```css
/* 支持单个类名选择器 */
.one-class {
  font-size: 36px;
}

/* 不支持关系选择器 */
.parent > .child {
  padding-top: 10px;
}

/* 不支持属性选择器，不支持 `v-cloak` 指令 */
[v-cloak] {
  color: #FF6600;
}
```

这个只是对样式定义的限制，不影响样式类名的使用，在标签中可以添加多个样式类名，如：

```html
<template>
  <div class="one two three"><div>
</template>
```

### 组件级别的作用域

在 Weex 中，写在组件 `<style>` 里的样式只能用在当前组件中，默认是 `scoped` 作用域。为了保持和 Native 的一致性，建议在 `.vue` 文件中写样式时，加上 `scoped` 属性，即： `<style scoped>`。

### 支持的样式属性

Weex 支持的样式特性是 CSS 的子集，并且会不断扩充；在实现过程中我们参考了 [CSS 属性在浏览器中的使用频率](https://gist.github.com/Jinjiang/ea6b403036b7287cf8b8508729b77ac0#css-properties)，优先实现其中频率最高的一些属性。

Weex 支持了基本的盒模型和 flexbox 布局，以及其他常用样式，详情可参考[Weex 通用样式文档](../common-style.html)。

在编写样式时，还应该注意一下几点：

+ 不需要写样式前缀。
+ Weex 不支持 `display: none;`，因此也不支持 `v-show` 指令。
+ 为了优化样式解析的效率，样式属性暂不支持简写，涉及一下属性：
  + `border` 、`border-(top|bottom|left|right)`
  + `margin`
  + `padding`
  + `flex`
