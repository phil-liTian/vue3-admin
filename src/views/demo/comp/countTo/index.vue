<!--
 * @Date: 2024-04-12 13:43:30
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title='数字动画'>
    <Card>
      <CardGrid v-for="item in dataList" :key="item.color" class="count-to-demo-card">
        <PCountTo v-bind="item"></PCountTo>
      </CardGrid>
    </Card>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Card } from 'ant-design-vue'
  defineOptions({ name: 'CountToDemo' })
  const CardGrid = Card.Grid

  const dataList = [
    { prefix: "$",color: "#409EFF", startVal: 1, endVal: 200000 },
    { suffix: "$", color: 'red', startval: 1, endVal: 3000, decimals: 2, duration: 6000 },
    { suffix: "$", color: 'rgb(0,238,0)', startval: 1, endVal: 3000, decimals: 2, duration: 7000 },
    { separator: '-', color: 'rgba(138,43,226,.6)', startval: 1000, endVal: 3000, decimals: 2, duration: 1000 },
  ]
</script>
  
<style lang='less' scoped>
  .count-to-demo-card {
    width: 50%;
    font-size: 30px;
    text-align: center;
  }
</style>