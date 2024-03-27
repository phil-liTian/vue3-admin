<!--
 * @Date: 2024-03-26 22:47:00
 * @LastEditors: phil_litian
-->
<template>
  <div class="flex">
    <template v-for="item in growCardList" :key="item.title">
      <Card 
        :title="item.title" 
        :loading="loading">
        111
      </Card>
    </template>
  </div>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@u/propTypes'
  import { Card } from 'ant-design-vue'
  import { growCardList } from '../data'
  const props = defineProps({
    loading: propTypes.bool.def(false)
  })
</script>
  
<style lang='less' scoped>
  
</style>