<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
<template>
  <!-- ant-design提供的国际化组件 -->
  <ConfigProvider :locale="getAntdLocale" :theme="themeConfig">
    <!-- 可实现全局注入一些数据 -->
    <AppProvider>
      <RouterView />  
    </AppProvider>
  </ConfigProvider>
</template>
  
<script lang='ts' setup>
import { ConfigProvider } from 'ant-design-vue'
import { computed } from 'vue'
import { useLocale } from '@/locales/useLocale'
import { useTitle } from '@h/web/useTitle'
import AppProvider from '@c/Application/src/AppProvider.vue'

const { getAntdLocale } = useLocale()

const themeConfig = computed(() => {
  return {
    token: {
      colorPrimary: '#3370FF'
    }
  }
})

useTitle()
// createBreakpointListen方法封装
// 菜单折叠效果 collapse
// 菜单手风琴参数
</script>
  
<style lang='less' scoped>
  
</style>
