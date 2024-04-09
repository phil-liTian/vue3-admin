<!--
 * @Date: 2024-04-02 19:29:27
 * @LastEditors: phil_litian
-->
<template>
  <Dropdown>
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <Menu>
        <MenuItem 
          v-for="item in dropMenuList" 
          :key="item.event"
          @click="handleMenuClick(item)">
          <Popconfirm 
            v-if="popConfirm && item.popConfirm"
            title="Are you sure delete this task?">
            <p-icon v-if="item.icon" :icon="item.icon"></p-icon>
            <span>{{ item.text }}</span>
          </Popconfirm>

          <template v-else>
            <p-icon v-if="item.icon" :icon="item.icon"></p-icon>
            <span>{{ item.text }}</span>
          </template>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
  
<script lang='ts' setup>
  import { Dropdown, Menu, Popconfirm } from 'ant-design-vue'
  import { PropType } from 'vue'
  import type { DropMenu } from './typing'
  defineOptions({ name: 'PDropdown' })
  const MenuItem = Menu.Item
  const props = defineProps({
    popConfirm: Boolean,
    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: () => []
    }
  })
  const emits = defineEmits(['menuEvent'])

  const handleMenuClick = (item: DropMenu) => {
    emits('menuEvent', item)
  }
</script>
  
<style lang='less' scoped>
  
</style>