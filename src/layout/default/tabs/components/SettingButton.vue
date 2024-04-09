<!--
 * @Date: 2024-03-31 10:43:13
 * @LastEditors: phil_litian
 项目设置
-->
<template>
  <span :class="`${prefixCls}__extra-fold`" @click="openDrawer(true)">
    <SettingOutlined />
    <SettingDrawer @register="register" />
  </span>
</template>
  
<script lang='ts' setup>
  import { SettingOutlined } from '@ant-design/icons-vue'
  import SettingDrawer from '../../setting/SettingDrawer';
  import { useDrawer } from '@c/PBase/Drawer/src/useDrawer'
  import { useDesign } from '@h/web/useDesign'
  defineOptions({ name: 'SettingButton' })
  const [ register, { openDrawer } ] = useDrawer()
  const { prefixCls } = useDesign('multiple-tabs-content')
</script>
  
<style lang='less' scoped>
  
</style>
