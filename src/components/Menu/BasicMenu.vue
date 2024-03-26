<!--
 * @Date: 2024-03-03 13:57:10
 * @LastEditors: phil_litian
-->
<template>
  <Menu 
    :selected-keys="menuState.selectKeys"
    :open-keys="getOpenKeys"
    @click="handleMenuClick"
    @open-change="handleOpenChange"
    mode="inline"
    :sub-menu-open-delay="0.2">
    <template v-for="item in props.items" :key="item.key">
      <BasicSubMenuItem :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
import { defineEmits, reactive, unref } from 'vue'
import { Menu } from 'ant-design-vue'
import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { basicProps } from './props'
import { useOpenKeys } from './useOpenKeys'
import { MenuState } from './types'
import { toRefs } from 'vue'
const props = defineProps(basicProps)
const emit = defineEmits(['menuClick'])
// 可以通过控制openKeys来控制手风琴的效果
const { accordion, items, mode } = toRefs(props)

const menuState = reactive<MenuState>({
  defaultSelectKeys: [], // 默认选中的key
  selectKeys: [], // 选中的key
  openKeys: [], // 展开的key
})

const { getOpenKeys, setOpenKeys, handleOpenChange } = useOpenKeys(menuState, items, mode, accordion)


const handleMenuClick = ({ key }) => {
  emit('menuClick', key)
  menuState.selectKeys = [key]
}
</script>
  
<style lang='less' scoped>
  
</style>