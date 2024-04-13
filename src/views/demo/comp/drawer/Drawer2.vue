<!--
 * @Date: 2024-04-13 19:27:34
 * @LastEditors: phil_litian
-->
<template>
  <PDrawer v-bind="$attrs" @register="register" width="50%" title="内外可同时关闭Drawer">
    Drawer Info.
    <PButton type="primary" @click="openDrawer(false)">关闭PDrawer</PButton>
  </PDrawer>
</template>
  
<script lang='ts' setup>
  import { useDrawer } from '@c/PBase/Drawer/index'

  const [register, { openDrawer }] = useDrawer()

</script>
  
<style lang='less' scoped>
  
</style>