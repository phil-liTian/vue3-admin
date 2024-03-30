<!--
 * @Date: 2024-03-29 20:51:40
 * @LastEditors: phil_litian
-->
<template>
  <Card 
    :tab-list="tabList"
    :active-tab-key="tabKey"
    :loading="loading"
    @tab-change="handleTagChange">
    
    <VisitAnalysis v-if="tabKey === 'tab1'"/>

    <VisiAnalysisBar v-if="tabKey === 'tab2'" />
  </Card>
</template>
  
<script lang='ts' setup>
  import { Card } from 'ant-design-vue'
  import { propTypes } from '@u/propTypes'
  import { ref } from 'vue'
  import VisitAnalysis from './VisitAnalysis.vue'
  import VisiAnalysisBar from './visitAnalysisBar.vue'
  const tabList = [
    { key: 'tab1', tab: '流量' },
    { key: 'tab2', tab: '访问量' }
  ]
  const tabKey = ref('tab1')

  const props = defineProps({
    loading: propTypes.bool.def(false)
  })

  const handleTagChange = (tab) => {
    console.log('tab', tab);
    tabKey.value = tab
  }
</script>
  
<style lang='less' scoped>
  
</style>