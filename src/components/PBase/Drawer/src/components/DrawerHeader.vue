<!--
 * @Date: 2024-03-28 10:34:47
 * @LastEditors: phil_litian
-->
<template>
  <p-basic-title v-if="!isDetail">
    {{ $slots.title ? '' : title }}
  </p-basic-title>
  <div :class="getClass">
    111
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@u/propTypes'
  import { useDesign } from '@h/web/useDesign'
  import { computed } from 'vue'
  defineOptions({ name: 'BasicDrawerHeader' })
  const { prefixCls } = useDesign('basic-drawer-header')

  const props = defineProps({
    isDetail: propTypes.bool.def(true),
    title: propTypes.string
  })

  const getClass = computed(() => {
    return [
      prefixCls,
      `${prefixCls}--detail`
    ]
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls:  ~'@{namespace}-basic-drawer-header';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>