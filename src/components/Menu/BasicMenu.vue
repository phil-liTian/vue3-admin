<!--
 * @Date: 2024-03-03 13:57:10
 * @LastEditors: phil_litian
-->
<template>
  <Menu mode="inline">
    <template v-for="item in props.items" :key="item.key">
      <BasicSubMenuItem :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { basicProps } from './props'
const props = defineProps(basicProps)

</script>
  
<style lang='less' scoped>
  
</style>