<!--
 * @Date: 2024-04-12 13:43:55
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="卡片列表">
    <CardList :api="demoListApi"></CardList>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { CardList } from '@c/CardList/index'
  import { demoListApi } from '@/api/demo/table'
  defineOptions({ name: 'CardListDemo' })
</script>
  
<style lang='less' scoped>
  
</style>