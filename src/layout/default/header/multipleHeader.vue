<!--
 * @Date: 2024-03-03 10:36:24
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass">
    <LayoutHeader v-if="getShowInsetHeader" />
    <MultipleTabs v-if="getShowTabs" />
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, unref } from 'vue'
  import LayoutHeader from './index.vue'
  import MultipleTabs from '../tabs/index.vue'
  import { useDesign } from '@h/web/useDesign'
  import { useMultipleTabSetting } from '@h/setting/useMultipleTabSetting'
  import { useHeaderSetting } from '@h/setting/useHeaderSetting'
  defineOptions({ name: 'LayoutMultipleHeader' })
  
  const { getShowMultipleTab } = useMultipleTabSetting()
  const { getShowInsetHeader } = useHeaderSetting()
  const { prefixCls } = useDesign('layout-multiple-header')

  const getShowTabs = computed(() => {
    return unref(getShowMultipleTab)
  })

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