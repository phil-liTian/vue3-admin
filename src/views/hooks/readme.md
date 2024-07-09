<!--
 * @Date: 2024-06-18 19:27:04
 * @LastEditors: phil_litian
-->
1. tsx文件中若要使用到具名插槽，可使用v-slots(不可直接使用template)
 1.1 tsx组件中如果要用到双向绑定, 不可直接使用v-model:value 会导致编译不通过
```jsx
  <PageWrapper v-slots={{ headerContent: this.headerContent }} />
  
  <Input v-model={[search.value, 'value']} v-model:value="{{search}}" placeholder='Please enter username'></Input>
```

2. @phil/hooks中有一整套模仿ahooks的useRequest的实现(plugins的封装思路很不错)