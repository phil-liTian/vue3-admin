<!--
 * @Date: 2024-04-01 21:48:05
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <span>{{ title }}</span>
    <PSwitch 
      v-bind="getBindValue"
      @change="handleChange" />
  </div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@u/propTypes'
  import { computed, PropType } from 'vue'
  import { HandlerEnums } from '../enums'
  import { baseHandler } from '../handler'
  const { prefixCls } = useDesign('setting-switch-item')
  defineOptions({ name: 'SwitchItem' })
  const props = defineProps({
    title: propTypes.string.def(''),
    def: propTypes.bool.def(false),
    event: {
      type: Number as PropType<HandlerEnums>
    }
  })

  const getBindValue = computed(() => {
    return props.def ? { checked: props.def } : {}
  })

  const handleChange = (val) => {
    props.event && baseHandler(props.event, val)
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>