<!--
 * @Date: 2024-03-03 11:26:59
 * @LastEditors: phil_litian
-->
<template>
  <div :class="['p-4', prefixCls]">
    <GrowCard :loading="loading" class="enter-x"/>
    <!-- <VisitSource :loading="loading" /> -->
  </div>

</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import GrowCard from './components/GrowCard.vue'
  import VisitSource from './components/VisitSource.vue'
  const { prefixCls } = useDesign('analysis')
  const loading = ref(true)  
  

  setTimeout(() => {
    loading.value = false
  }, 500);
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-analysis';

  .@{prefix-cls} {
    width: 100%;
  }
</style>