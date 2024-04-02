<!--
 * @Date: 2024-04-02 16:23:09
 * @LastEditors: phil_litian
-->
<template>
  <Select
    v-bind="getBindValue">
  </Select>
</template>
  
<script lang='ts' setup>
  import { computed, useAttrs } from 'vue'
  import { Select } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  defineOptions({ name: 'PSelect' })
  const { prefixCls } = useDesign('basic-select')
  const attrs = useAttrs()

  const getBindValue = computed(() => {
    return attrs
  })
</script>
  
<style lang='less' scoped>
  
</style>