<!--
 * @Date: 2024-03-28 17:27:00
 * @LastEditors: phil_litian
-->
<template>
  <span :class="getClass">
    <slot></slot>
    <basic-help></basic-help>
  </span>
</template>
  
<script lang='ts' setup>
  import { computed } from "vue"
  import { useDesign } from '@h/web/useDesign'
  import BasicHelp from "./BasicHelp.vue";
  const { prefixCls } = useDesign('basic-title')

  defineOptions({ name: 'PBasicTitle' })

  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {

  }
</style>