<!--
 * @Date: 2024-03-03 11:26:59
 * @LastEditors: phil_litian
-->
<template>
  <div :class="['p-4', prefixCls]">
    <GrowCard :loading="loading" class="enter-x"/>
    <SiteAnalysis :loading="loading" class="my-4 enter-x" />
    <div class="md:flex enter-x">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 md:mx-4 md:my-0 w-full" :loading="loading" />
      <SaleProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>

</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import GrowCard from './components/GrowCard.vue'
  import VisitSource from './components/VisitSource.vue'
  import VisitRadar from './components/VisitRadar.vue'
  import SaleProductPie from './components/SaleProductPie.vue'
  import SiteAnalysis from './components/SiteAnalysis.vue'
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