<!--
 * @Date: 2024-03-28 10:34:47
 * @LastEditors: phil_litian
-->
<template>
  <p-basic-title v-if="!isDetail">
    {{ $slots.title ? '' : title }}
  </p-basic-title>

  


</template>
  
<script lang='ts' setup>
  import { propTypes } from '@u/propTypes'
  import { useDesign } from '@h/web/useDesign'
  defineOptions({ name: 'BasicDrawerHeader' })
  const { prefixCls } = useDesign('basic-drawer-header')

  const props = defineProps({
    isDetail: propTypes.bool.def(false),
    title: propTypes.string
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls:  ~'@{namespace}-basic-drawer-header';

  .@{prefix-cls} {
    
  }
</style>