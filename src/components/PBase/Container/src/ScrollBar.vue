<!--
 * @Date: 2024-04-10 21:48:35
 * @LastEditors: phil_litian
-->
<template>
  <div class="scrollbar">
    <div class="scrollbar__wrap">
      <slot></slot>

    </div>
  </div>
</template>
  
<script lang='ts' setup>
  defineOptions({ name: 'ScrollBar' })
</script>
  
<style lang='less' scoped>
  
</style>