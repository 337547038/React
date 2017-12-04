# React UI组件库
一个基于React的前端UI组件库，React表单验证、React弹层及alert、confirm弹窗、React Tooltip组件，React单选Radio多选Checkbox及Select等form表单元素，Ajax异步数据请求等组件，所有组件代码均兼容IE8;

## 组件说明
- Ajax 
    用于解决前端与后端的通信，数据请求

- Button 
   表单button元素

- Checkbox
  表单Checkbox元素，包括多选

- Dialog
  alert、confirm弹窗组件

- Form
  表单组件，表单验证

- Input
  表单input元素

- Layer
  React弹窗组件

- Radio
  表单Radio元素

- SelectDropDown
  div仿Select下拉，解决在各种浏览器的显示外面问题

- Textarea
  表单Textarea元素

- Tooltip
  Tooltip提示组件，支持9宫格方向提示及提示自动换行

## 项目目录结构说明
- dist
   UI组件库的发布版本
- src
  UI组件的组件源码
- src/examples
  UI组件的使用示例，包括可运行示例及示例源码，每一个组件都有一个示例。

### 引用：
如果需要兼容IE8，需要在页面引用es5-sham和es5-shim文件。

```
    <script type="text/javascript" src="../libs/es5-shim.min.js"></script>
    <script type="text/javascript" src="../libs/es5-sham.min.js"></script>
```

## 使用
   - $ npm run dev
       在浏览器输入http://localhost:8080/

  - $ npm run build 
      编译示例到dist输出目录
      
 ## 示例
 https://337547038.github.io/reactDemo/
