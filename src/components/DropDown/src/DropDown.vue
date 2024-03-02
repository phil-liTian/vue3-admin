<!--
 * @Date: 2024-02-24 13:48:48
 * @LastEditors: phil_litian
-->
<template>
  <a-drop-down v-bind="$attrs">
    <slot></slot>
    <template #overlay>
      <a-menu
        :selectedKeys="selectedKeys">
        <a-menu-item 
          v-for="menu in dropMenuList" 
          :key="menu.key"
          :disabled="menu.disabled"
          @click="handleMenuClick(menu)">
          {{ menu.text }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-drop-down>
</template>
  
<script lang='ts' setup>
  import { onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { Dropdown, Menu } from 'ant-design-vue'
  import { DropMenu } from './types'
  const ADropDown = Dropdown
  const AMenu = Menu
  const AMenuItem = Menu.Item
  
  const emits = defineEmits(['menuClick']);

  const props = defineProps({
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: []
    },

    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => {
        return []
      }
    }
  })

  const handleMenuClick = (item: DropMenu) => {
    emits('menuClick', item)
  }

  onMounted(() => {
  })
</script>
  
<style lang='less' scoped>
  
</style>