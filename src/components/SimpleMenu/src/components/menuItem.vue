<!--
 * @Date: 2024-03-23 12:56:16
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass">
    <slot name=title></slot>
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed } from 'vue'
  const { prefixCls } = useDesign('menu-item')

  // 获取class
  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  
</style>