<!--
 * @Date: 2024-04-02 16:51:34
 * @LastEditors: phil_litian
-->
<template>
  <span @click="toggleCollpased">
    <DoubleLeftOutlined v-if="!getCollapsed"/>
    <DoubleRightOutlined v-else />
  </span>
</template>
  
<script lang='ts' setup>
  import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
  import { useMenuSetting } from '@h/setting/useMenuSetting'

  const { getCollapsed, toggleCollpased } = useMenuSetting()
</script>
  
<style lang='less' scoped>
  
</style>