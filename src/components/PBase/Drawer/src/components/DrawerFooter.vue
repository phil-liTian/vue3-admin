<!--
 * @Date: 2024-03-28 10:34:55
 * @LastEditors: phil_litian
-->
<template>
  <div>drawerFooter</div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { footerProps } from '../props'
  const { prefixCls } = useDesign('basic-drawer-footer')
  const props = defineProps({
    ...footerProps
  })

  


</script>
  
<style lang='less' scoped>
  
</style>