<!--
 * @Date: 2024-02-24 09:47:32
 * @LastEditors: phil_litian
-->
<template>
  <svg :class="prefixCls" :style="getStyle">
    <use :xlink:href="symbolId"></use>
  </svg>
</template>
  
<script lang='ts' setup>
import { computed } from 'vue'
import { useDesign } from '@h/web/useDesign'
const props = defineProps({
  name: {
    type: String,
    reqired: true
  },

  size: {
    type: [Number, String],
    default: 16
  }
})

const { prefixCls } = useDesign('svg-icon')

const symbolId = computed(() => `#icon-${props.name}`)

const getStyle = computed(() => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  
  return {
    width: s,
    height: s
  }
})
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    fill: red;
  }
</style>