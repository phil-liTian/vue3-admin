<!--
 * @Date: 2024-05-29 21:51:47
 * @LastEditors: phil_litian
-->
<template>
  <div :class="[ prefixCls ]">
    <!-- actions -->
    <template v-for="(action, index) in getActions" :key="`${action.label}-${index}`">
      <Tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <PPopConfirmButton v-bind="action">
          <PIcon v-if="action.icon" :icon="action.icon"></PIcon>
          <template v-if="action.label">{{ action.label }}</template>
        </PPopConfirmButton>
      </Tooltip>

      <PPopConfirmButton v-else v-bind="omit(action, 'icon')">
        <PIcon :icon="action.icon"></PIcon>
        <template v-if="action.label">{{ action.label }}</template>
      </PPopConfirmButton>
    </template>

    <!-- dropDown -->
    <PDropdown 
      trigger="click"
      v-if="getDropdownList && getDropdownList.length"
      popConfirm
      :dropMenuList="getDropdownList">
      <slot name="more"></slot>
      <PButton type="link" size="small" v-if="!$slots.more">
        <MoreOutlined />
      </PButton>
    </PDropdown>
  </div>
</template>
  
<script lang='ts' setup>
  import { Tooltip, TooltipProps } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { computed, PropType } from 'vue';
  import { omit } from 'lodash-es'
  import { MoreOutlined } from '@ant-design/icons-vue'
  import { ActionItem } from '../types/tableAction';
  
  const { prefixCls } = useDesign('basic-table-action')
  const props = defineProps({
    actions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    },

    dropDownActions: {
      type: Array as PropType<ActionItem[]>,
      default: null
    }
  })

  const getActions = computed(() => (props.actions || []).map(action => {
    const { popConfirm } = action
    return {
      type: 'link',
      ...action,
      enable: !!popConfirm
    }
  }))

  const getDropdownList = computed(() => {
    return props.dropDownActions || []
  })

  // const getTooltip = computed(() => {
  //   return (data: TooltipProps) : TooltipProps => {
  //     return {
  //       placement: 'bottom'
  //     } as TooltipProps
  //   }
  // })


  function getTooltip(data: string | TooltipProps): TooltipProps {
    return {
      placement: 'bottom'
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>