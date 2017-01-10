---
title: dom
type: references
order: 3.3
version: 2.1
---

# dom

## Summary

A series of dom apis that sending virtual-dom's messages to the native renderer to update the dom tree. The only API for developers to use in a `.we` file is `scrollToElement` <del>which you can use by calling the `$scrollTo` method</del>. Other APIs mentioned on this page should only be used through the native renderer in the `callNative` process.

## API

### scrollToElement(node, options)

Scroll the page to the specified node. This API should only be used on the element in the `scroller` or `list` component.

<del>This API can be used by calling the VM's method `$scrollTo` **(deprecated)**.</del> You can use `require('@weex-module/dom').scrollToElement` to call this API in your `.we` file.

#### Arguments

* `node`*(Node)*: an element that scrolled into the view.
* `options`*(object)*: some options.
  * `offset`*(number)*: An offset to the visible position, default is `0`.

#### Example

```javascript
var dom = require('@weex-module/dom');
dom.scrollToElement(this.$el('someId'), {offset: 10});
```

### getComponentRect(ref,callback)<sup>v0.9.4+</sup>

You can get the view rectangle information of named element.

An example callback result maybe:

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

If you want to get the rectangle information of 'weex view' container, you can specify the `ref='viewport'`.

Example Useage:

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