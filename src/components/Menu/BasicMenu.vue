<!--
 * @Date: 2024-03-03 13:57:10
 * @LastEditors: phil_litian
-->
<template>
  <Menu 
    @click="handleMenuClick"
    mode="inline">
    <template v-for="item in props.items" :key="item.key">
      <BasicSubMenuItem :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
import { defineEmits } from 'vue'
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { basicProps } from './props'
const props = defineProps(basicProps)
const emit = defineEmits(['menuClick'])


const handleMenuClick = ({ key }) => {
  emit('menuClick', key)
}
</script>
  
<style lang='less' scoped>
  
</style>