<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <AppLogo />
    
  </div>
</template>
  
<script lang='ts' setup>
  import { defineProps, computed } from 'vue'
  import { AppLogo } from '@c/Application'
  import { useAppStore } from '@s/modules/app'
  import { useDesign } from '@h/web/useDesign'
  import { store } from '@s/index'
  const { prefixCls } = useDesign('login')
  
</script>
  
<style lang='less'>
  // @prefix-cls: ~'@{namespce}-login';

  // .@{prefix-cls} {
  //   // color: @main-color;
  // }
</style>
