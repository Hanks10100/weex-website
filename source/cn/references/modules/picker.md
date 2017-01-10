---
title: picker
type: references
order: 3.11
version: 2.1
---

# picker

<span class="weex-version">v0.9+</span>

## 概述

以下为 picker 相关的 API，用于数据选择，日期选择，时间选择。

## API
### `pick(options, callback[options])`

调用单选 picker

#### 参数

- `options {Object}`：调用单选 picker 选项
  - `index {number}`：默认选中的选项
  - `items {array}`：picker 数据源

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {number}`：选择的选项,仅成功确认时候存在。

#### 示例

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="single pick" onclick="pick" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>


<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pick: function() {
        var picker = require('@weex-module/picker');
        var items = new Array("Saab","Volvo","BMW");
        var self = this;
        picker.pick({
          'items':items,
          'index':self.index
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = items[ret.data];
            self.index = ret.data;
          }
        });
      },
    }
  }
</script>
```

[体验一下](http://dotwe.org/5213cb5cd40106401a93dbe724324400)

### `pickDate(options, callback[options])`

调用 date picker

#### 参数

- `options {Object}`：调用 date picker 选项
  - `value {string}`：必选，date picker 选中的值，date 的字符串格式为`yyyy-MM-dd`
  - `max {string}`：可选，date 的最大值
  - `min {string}`：可选，date 的最小值

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {string}`：选择的值 date 的字符，格式为 `yyyy-MM-dd`, 仅成功确认的时候存在。

#### 示例

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="pick date" onclick="pickDate" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pickDate: function() {
        var picker = require('@weex-module/picker');
        var self = this;
        picker.pickDate({
          'value':'2016-11-28',
          'max':'2029-11-28',
          'min':'2015-11-28'
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = ret.data;
          }
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/2ee6fcdd3508db90c84185b40bf49ee3)

### `pickTime(options, callback[options])`

调用 time picker

#### 参数

- `options {Object}`：调用 time picker 选项
  - `value {string}`：必选，time 格式为 `HH:mm`

- `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `result {string}`：结果三种类型 `success`, `cancel`, `error`
  - `data {string}`：time 格式为 `HH:mm`, 仅成功确认的时候存在。

#### 示例

```html
<template>
  <scroller>
    <div title="picker module">
      <text style="margin-bottom: 20px;">pick value: {{value}}</text>
      <text type="default" size="small" value="pick time" onclick="pickTime" style="width: 180px;height: 50px; border-color: #26a4f4;font-color: #26a4f4;border-width: 2px"></text>
    </div>
  </scroller>
</template>

<style>
  .input {
    font-size: 60px;
    height: 80px;
    width: 400px;
  }
</style>

<script>
  module.exports = {
    data: {
      value: '',
      index: 0,
    },
    methods: {
      pickTime: function() {
        var picker = require('@weex-module/picker');
        var self = this;
        picker.pickTime({
          'value':'19:24'
        },function (ret) {
          var result = ret.result;
          if(result == 'success')
          {
            self.value = ret.data;
          }
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/a9851d2773ac784729006d6b2add99c9)