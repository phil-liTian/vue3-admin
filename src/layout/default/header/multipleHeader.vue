<!--
 * @Date: 2024-03-03 10:36:24
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass">
    <LayoutHeader />
    <!-- <MultipleTabs /> -->
  </div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed } from 'vue'
  import LayoutHeader from './index.vue'
  import MultipleTabs from '../tabs/index.vue'
  defineOptions({ name: 'LayoutMultipleHeader' })

  const { prefixCls } = useDesign('layout-multiple-header')

  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })

</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-layout-multiple-header';


  .@{prefix-cls} {
    
  }
</style>