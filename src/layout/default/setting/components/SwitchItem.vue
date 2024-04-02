<!--
 * @Date: 2024-04-01 21:48:05
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <PSwitch />
  </div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@u/propTypes'
  const { prefixCls } = useDesign('setting-switch-item')
  defineOptions({ name: 'SwitchItem' })
  defineProps({
    title: propTypes.string.def('')
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>