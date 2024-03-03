<!--
 * @Date: 2024-03-03 14:40:59
 * @LastEditors: phil_litian
-->
<template>
  <span>
    {{ props.item.name }}
  </span>
</template>
  
<script lang='ts' setup>
  import { contentProps } from '../props'

  const props = defineProps(contentProps)
</script>
  
<style lang='less' scoped>
  
</style>