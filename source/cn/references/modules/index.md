---
title: 内建模块
type: references
order: 3
has_chapter_content: true
version: 2.1
---

# 内建模块

## 如何使用

你可以简单的通过类似 `require('@weex-module/name')` 这样的语法获取一个模块的 API，比如：

```javascript
var dom = require('@weex-module/dom')
dom.scrollToElement(this.$el('someIdForElement'), {
  offset: 0
})
```
