<!--
 * @Date: 2024-02-26 19:56:06
 * @LastEditors: phil_litian
-->
<template>
  <div>redirect</div>
</template>
  
<script lang='ts' setup>
  import { useRouter, useRoute } from 'vue-router'
  // const router = useRouter()
  const route = useRoute()
  console.log('router', route.params);
  
</script>
  
<style lang='less' scoped>
  
</style>