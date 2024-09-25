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
// 通知组件

// 增加多层级菜单
// 增加引导页功能

// 缓存
// axios 封装
// 对路由的处理 listenRouteChange, 可实现在页面渲染之前监听路由变化； permissionGuard实现权限守卫，可实现路由routes根据权限动态处理
// 使用vue-i18n做国际化配置; 使用iconify来处理部分图标; 使用unocss来处理常规样式。
// 梳理Persistent逻辑

// 操作权限问题

// useRequest
// 权限
// 测试 (清除bug后稳定版本)

// 目标 9月9号完成
</script>
  
<style lang='less' scoped>
  
</style>
