---
title: <div>
type: references
order: 2.2
version: 2.1
---

# &lt;div&gt;

### Summary

The most fundamental component which is a contianer to wrap any other components. It supports all the common styles, attributes and layout of flexbox.

alias: `<container>` (deprecated)

### Child Components

This type of component supports all kinds of weex component as its child components including its own kind.

### Attributes

There is no specific attribute for this component other than the [common attributes](../common-attrs.html).

### Styles

**common styles**: check out the [common styles](../common-attrs.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../common-event.html)

- support `click` event. Check out [common events](../common-event.html)
- support `appear` / `disappear` event. Check out [common events](../common-event.html)

### Examples

```html
<template>
  <div>
    <div class="text">invisible</div>
    <text class="text">visible in &#60;text&#62;</text>
  </div>
</template>

<style scoped>
  .text {
    text-align: center;
    width: 600px;
    margin-left: 75px;
    margin-top: 75px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    font-size: 36px;
    color: #FF6600
  }
</style>
```

