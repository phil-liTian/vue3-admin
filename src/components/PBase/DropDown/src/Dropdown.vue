<!--
 * @Date: 2024-04-02 19:29:27
 * @LastEditors: phil_litian
-->
<template>
  <Dropdown :trigger="trigger">
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      <Menu :selected-keys="selectedKeys">
        <MenuItem 
          v-for="item in dropMenuList" 
          :key="item.event"
          @click="handleMenuClick(item)">
          <Popconfirm 
            v-if="popConfirm && item.popConfirm"
            v-bind="getPopConfirmAttrs(item.popConfirm)">
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
  import { PropType, computed } from 'vue'
  import { omit } from 'lodash-es'
  import type { DropMenu } from './typing'
  import { isFunction } from '@/utils/is';
  defineOptions({ name: 'PDropdown' })
  const MenuItem = Menu.Item
  const props = defineProps({
    popConfirm: Boolean,
    trigger: {
      type: String as PropType<'contextmenu' | 'click' | 'hover'>,
      default: 'contextmenu'
    },

    dropMenuList: {
      type: Array as PropType<DropMenu[]>,
      default: () => []
    },
    selectedKeys: Array as PropType<(string | number)[]>
  })
  const emits = defineEmits(['menuEvent'])

  const getPopConfirmAttrs = computed(() => {
    return (attrs) => {
      const originAttrs = omit(attrs, ['confirm'])
      if ( attrs.confirm && isFunction(attrs.confirm) ) {
        originAttrs.onConfirm = attrs.confirm
      }

      return originAttrs
    }
  })

  const handleMenuClick = (item: DropMenu) => {
    emits('menuEvent', item)
  }
</script>
  
<style lang='less' scoped>
  
</style>