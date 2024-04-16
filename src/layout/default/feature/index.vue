<!--
 * @Date: 2024-04-15 11:00:24
 * @LastEditors: phil_litian
-->
<template>
  <LayoutLockPage />
</template>
  
<script lang='ts' setup>
  import { createAsyncComponent } from "@u/factory/createAsyncComponent";

  const LayoutLockPage = createAsyncComponent(() => import('@/views/sys/lock/index.vue'))
</script>
  
<style lang='less' scoped>
  
</style>