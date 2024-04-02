<!--
 * @Date: 2024-04-02 16:50:49
 * @LastEditors: phil_litian
-->
<template>
  <SideTrigger v-if="sider" />
  <HeaderTrigger v-else />
</template>
  
<script lang='ts' setup>
  import { SideTrigger, HeaderTrigger } from './components/index'
  import { propTypes } from '@u/propTypes'
  defineProps({
    sider: propTypes.bool.def(false)
  })
</script>
  
<style lang='less' scoped>
  
</style>