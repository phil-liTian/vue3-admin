<!--
 * @Date: 2024-03-03 14:03:31
 * @LastEditors: phil_litian
-->
<template>
  <BasicMenuItem v-if="!menuHasChildren(item)" :item="item"/>
  <SubMenu v-else>
    <template #title>
      <MenuItemContent :item="item" />
    </template>
    
    <template v-for="childrenItem in item.children || []" :key="childrenItem.key">
      <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </SubMenu>
</template>
  
<script lang='ts' setup>
import { Menu } from 'ant-design-vue'
import MenuItemContent from './MenuItemContent.vue';
import BasicMenuItem from './BasicMenuItem.vue';
import { itemProps } from '../props'
import { computed } from 'vue';
const SubMenu = Menu.SubMenu
const props = defineProps(itemProps)

const menuHasChildren = (item) => {
  return item.children?.length
}

</script>
  
<style lang='less' scoped>
  
</style>