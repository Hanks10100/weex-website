---
title: dom
type: references
order: 3.3
version: 2.1
---

# dom

包含如下可以更新 dom 树的 dom API。

这部分API是通过把 virtual-dom 的消息发送到 native 渲染器来做到的。

开发者在日常开发中，唯一可在 `.we` 文件中使用的是 `scrollToElement`。
~~你也可以调用 `$scrollTo` 方法来使用它~~

这个页面提及的其他的 API，只在 `callNative` 进程中的 native 渲染器用。
（关于 `callNative` 进程的进一步介绍，可以在 [How it works](../../advanced/how-it-works.html)中的 JS Framework 部分看到 ）

## API
### scrollToElement(node, options)

让页面滚动到那个对应的节点，这个API只能在 `<scroller>` 和 `<list>` 组件中用。

~~这个API也能通过调用VM的方法 `$scrollTo` 来使用（已弃用）~~

要在你的 `.we` 文件中使用这个 API，可以使用 `require('@weex-module/dom').scrollToElement`。

#### 参数
- `node {Node}`：你要滚动到的那个节点
- `options {Object}`：如下选项
  - `offset {number}`：一个到其可见位置的偏移距离，默认是 `0`

#### 示例

```html
<template>
  <scroller>
    <div class="row" repeat="item in rows" id="item-{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </div>
    <div onclick="go" style="width: 750;height: 50; position: fixed; left: 0; right: 0; bottom: 0; background-color: #eeeeee;">
      <text style="text-align: center;">
        Go to 50th line.
      </text>
    </div>
  </scroller>
</template>

<script>
var dom = require('@weex-module/dom')

module.exports = {
  data: {
    rows: []
  },
  created: function () {
    for (var i = 0; i < 100; i++) {
      this.rows.push({
        id: i
      })
    }
  },
  methods: {
    go: function () {
      var el = this.$el('item-49')
      
      dom.scrollToElement(el, {
        offset: 0
      })
    }
  }
}
</script>
```

### getComponentRect(ref, callback)<sup>v0.9.4+</sup>

通过标签的 `ref` 获得其布局信息，返回的信息在 `callBack` 中，格式参考如下：

```json
{
  result: true,
  size: {
    bottom: 60,
    height: 15,
    left: 0,
    right: 353,
    top: 45,
    width: 353
  }
}
```

如果想要获取到 Weex 容器的布局信息，可以指定 `ref='viewport'`，调用例子如下：

```html
<template>
  <div class="wrapper">
    <div class="box" id="box">
    </div>
    <text>Red box: {{boxposition}}</text>
    <text>Viewport: {{viewportposition}}</text>
    <div class="row">
      <div onClick="getBoxPosition" class="button">
        <text>Get red Box position</text>
      </div>
      <div onClick="getViewportPosition" class="button">
        <text>Get Viewport position</text>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.box {
  width: 300;
  height: 300;
  background-color: #f00;
  position: absolute;
  top: 300;
  left: 200;
}  
.row {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.button {
  flex: 1;
  background-color: #ddd;
  border-left-width: 1;
  border-left-color: #333;
  border-left-style: solid;
}
</style>

<script>
var dom = require('@weex-module/dom')

module.exports = {
  data: {
    boxposition: '',
    viewportposition: ''
  },
  methods: {
    getBoxPosition: function () {
      var el = this.$el('box')
      var self = this

       dom.getComponentRect(el, function(result) {
          self.boxposition = JSON.stringify(result)
      })
    },
    getViewportPosition: function () {
      var self = this

       dom.getComponentRect('viewport', function(result) {
          self.viewportposition = JSON.stringify(result)
      })
    }
  }
}
</script>
```

## 其他

dom 还有一些底层接口用于创建 Weex 实例时调用，比如 `createBody`、`updateAttrs` 等，但并未开放供外部使用。
