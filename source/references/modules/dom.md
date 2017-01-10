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
