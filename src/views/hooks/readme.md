<!--
 * @Date: 2024-06-18 19:27:04
 * @LastEditors: phil_litian
-->
1. tsx文件中若要使用到具名插槽，可使用v-slots(不可直接使用template)

```jsx
  <PageWrapper v-slots={{ headerContent: this.headerContent }} />
```

2. @phil/hooks中有一整套模仿ahooks的useRequest的实现(plugins的封装思路很不错)