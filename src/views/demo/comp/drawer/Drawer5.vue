<!--
 * @Date: 2024-04-13 22:49:14
 * @LastEditors: phil_litian
-->
<template>
  <PDrawer showFooter v-bind="$attrs" title="自适应高度" width="50%">
    <p class="h-20" v-for="item in 20" :key="item">自适应高度{{ item }}</p>

    <template #insertFooter>
      <PButton type="text">btn</PButton>
    </template>
  </PDrawer>
</template>
  
<script lang='ts' setup>
  
</script>
  
<style lang='less' scoped>
  
</style>