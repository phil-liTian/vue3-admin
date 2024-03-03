<!--
 * @Date: 2024-03-03 10:30:50
 * @LastEditors: phil_litian
-->
<template>
  <RouterView #default="{ route, Component }">
    <component :is="Component" :key="route.fullPath"></component>
  </RouterView>
</template>
  
<script lang='ts' setup>
  
</script>
  
<style lang='less' scoped>
 
</style>