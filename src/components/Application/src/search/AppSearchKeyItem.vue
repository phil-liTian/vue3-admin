<!--
 * @Date: 2024-04-08 17:17:04
 * @LastEditors: phil_litian
-->
<template>
  <div :class="$attrs.class">
    <p-icon :icon="icon"></p-icon>
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from "@/utils/propTypes";
  defineProps({
    icon: propTypes.string.def('')
  })
</script>
  
<style lang='less' scoped>
  
</style>