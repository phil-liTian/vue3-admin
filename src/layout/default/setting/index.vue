<!--
 * @Date: 2024-03-03 10:12:30
 * @LastEditors: phil_litian
-->
<template>
  <div @click="openDrawer(true)">
    <p-icon icon="material-symbols:settings-outline"></p-icon>
    <SettingDrawer @register="register" />
  </div>
</template>
  
<script lang='ts' setup>
  import SettingDrawer from './SettingDrawer'
  import { useDrawer } from '@c/PBase/Drawer/src/useDrawer'

  const [ register, { openDrawer } ] = useDrawer()
</script>
  
<style lang='less' scoped>
  
</style>