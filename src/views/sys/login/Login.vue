<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
<template>
  <div :class="[prefixCls, 'w-full', 'h-full', 'relative']">
    <div class=""></div>

    <app-logo />
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
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    height: 100vh;
    overflow: hidden;

    
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svg/login-bg.svg');
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
    }
  }
</style>
