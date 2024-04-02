<!--
 * @Date: 2024-03-31 10:43:13
 * @LastEditors: phil_litian
 项目设置
-->
<template>
  <span @click="openDrawer(true)">
    <SettingOutlined />
    <SettingDrawer @register="register" />
  </span>
</template>
  
<script lang='ts' setup>
  import { SettingOutlined } from '@ant-design/icons-vue'
  import SettingDrawer from '../../setting/SettingDrawer';
  import { useDrawer } from '@c/PBase/Drawer/src/useDrawer'
  defineOptions({ name: 'SettingButton' })
  const [ register, { openDrawer } ] = useDrawer()
</script>
  
<style lang='less' scoped>
  
</style>
