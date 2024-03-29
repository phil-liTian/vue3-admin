<!--
 * @Date: 2024-03-26 22:47:00
 * @LastEditors: phil_litian
-->
<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card 
        class="md:w-1/4 w-full"
        :class="{ 'mr-4': index < 3 }"
        :title="item.title" 
        :loading="loading">
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="flex justify-between flex-items-center px-4 py-4">
          <span>212</span>
          <p-icon :icon="item.icon" :size="40"></p-icon>
        </div>

        <div class="flex justify-between px-4">
          <span>总{{ item.title }}</span>
          <span>111</span>
        </div>
      </Card>
    </template>
  </div>
</template>
  
<script lang='ts' setup>
  import { Tag } from 'ant-design-vue'
  import { propTypes } from '@u/propTypes'
  import { Card } from 'ant-design-vue'
  import { growCardList } from '../data'
  const props = defineProps({
    loading: propTypes.bool.def(false)
  })
</script>
  
<style lang='less' scoped>
  
</style>