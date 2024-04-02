<!--
 * @Date: 2024-04-02 19:16:42
 * @LastEditors: phil_litian
-->
<template>
  <span :class="`${prefixCls}__extra-fold`">
    <p-icon :icon="getIcon"></p-icon>
  </span>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { ref, computed } from 'vue'
  const { prefixCls } = useDesign('multiple-tab-content')
  defineOptions({ name: 'FoldButton' });

  const getIcon = computed(() => {
    return true ? 'iconamoon:screen-normal' : 'iconamoon:screen-full'
  })
</script>
  
<style lang='less' scoped>
  
</style>