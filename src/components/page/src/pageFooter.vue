<!--
 * @Date: 2024-03-20 21:46:34
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__left`">
      <slot name="left"></slot>
    </div>
    <div :class="`${prefixCls}__right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('page-footer')
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-page-footer';

  .@{prefix-cls} {

  }
</style>