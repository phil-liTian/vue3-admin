<!--
 * @Date: 2024-05-07 10:24:23
 * @LastEditors: phil_litian
-->

# table组件二次封装

## 1.使用h函数动态渲染title元素,使用自定义TableHeader实现.(亮点1)


使用下面代码可实现动态声明多个具名插槽, 避免重复代码.
```vue
<template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
  <slot :name="item" v-bind="data || {}"></slot>
</template>
```

## 2.当涉及到跨层级组件通讯的时候 可考虑使用provide结合inject时间跨多层级组件通讯

```js
const key = Symbol('basic-table')
export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
```

## 3. 动态列设置组件 单独设置一个视图上可见的columns getViewColumns(与传进来的column相互独立处理, 类似于innerPropsRef覆盖props的逻辑 确保组件内属性隔离) 在columnsSetting组件中对columns进行处理 然后使用BasicTable中暴露出来的setColumns方法更改getViewColumns属性 从而实现可拖拽及动态展示的效果

## TODO 4.计算表格高度

## 5. 封装包含可编辑单元格的table组件。整体思路如下：
  5.1 使用table组件的customRender方法自定义可编辑单元格的元素逻辑(renderEditCell)
  5.2 renderEditCell使用h函数返回一个VNode对象
  5.3 EditableCell完成单元格元素的主要逻辑处理(此处有亮点处理方式: CellComponent是一个函数返回的VNode组件,而非常规的使用template封装的组件。h函数封装组件的优势在于更加便于逻辑处理。可以像常规组件一样传参！) 🌟🌟🌟
  5.4 CellComponent 则是完成实际的元素渲染逻辑
