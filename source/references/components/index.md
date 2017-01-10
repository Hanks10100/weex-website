---
title: <a>
type: references
order: 2
has_chapter_content: false
chapter_title: Build-in Components
version: 2.1
---

# &lt;a&gt;

`a` defines a hyperlink to a page in the web. Its purpose and syntax is very similar to [<a>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) in HTML5.

## Child Components

This type of component supports all kinds of weex component as it's child components except for its own kind.

## Attributes

* href: href attributes defines the URL of the hyperlink.

## Styles:

### common styles

Check out the [common styles](../common-style.html)

## Events

### common events

Check out the [common events](../common-event.html)

### Notes

We can't guarantee the order of execution between onclick function and href. we recommend that do not use the click event in `a`.

## Examples

```html
<template>
  <div>
    <a href="http://h5.m.taobao.com">
      <text>Click me to see how 'A' element opens a new world.</text>
    </a>
  </div>
</template>
```
