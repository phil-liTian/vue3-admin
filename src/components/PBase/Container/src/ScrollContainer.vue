<!--
 * @Date: 2024-03-28 17:49:37
 * @LastEditors: phil_litian
-->
<template>
  <div class="scroll-container">
    <slot></slot>
  </div>
</template>
  
<script lang='ts' setup>
  defineOptions({ name: 'PScrollContainer' })
</script>
  
<style lang='less' scoped>
  .scroll-container {
    height: 100%;
  }
</style>