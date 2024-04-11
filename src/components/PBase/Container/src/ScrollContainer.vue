<!--
 * @Date: 2024-03-28 17:49:37
 * @LastEditors: phil_litian
-->
<template>
  <ScrollBar 
    class="scroll-container">
    <slot></slot>
  </ScrollBar>
</template>
  
<script lang='ts' setup>
  import ScrollBar from './ScrollBar.vue'
  defineOptions({ name: 'PScrollContainer' })
</script>
  
<style lang='less' scoped>
  .scroll-container {
    height: 100%;
  }
</style>