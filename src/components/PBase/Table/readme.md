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

## 3. 动态列设置组件
