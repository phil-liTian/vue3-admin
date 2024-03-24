<!--
 * @Date: 2024-03-23 15:16:22
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass">
    <slot></slot>
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed } from 'vue'
  const { prefixCls } = useDesign('submenu')
  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  
</style>