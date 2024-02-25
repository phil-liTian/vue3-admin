<!--
 * @Date: 2024-02-24 13:48:48
 * @LastEditors: phil_litian
-->
<template>
  <a-drop-down>
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item 
          v-for="menu in dropMenuList" 
          :key="menu.text"
          :disabled="menu.disabled">
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
  
  const props = defineProps({
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: []
    }
  })

  onMounted(() => {
    console.log('ADropDown', ADropDown);
  })
</script>
  
<style lang='less' scoped>
  
</style>