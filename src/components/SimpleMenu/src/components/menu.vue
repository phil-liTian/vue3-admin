<!--
 * @Date: 2024-03-23 12:49:33
 * @LastEditors: phil_litian
-->
<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('menu')

  const getClass = computed(() => {
    return [
      prefixCls
    ]
  }) 
</script>
  
<style lang='less' scoped>
  @import './menu.less';
</style>