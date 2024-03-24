<!--
 * @Date: 2024-03-22 16:26:39
 * @LastEditors: phil_litian
-->
<template>
  <Card title="项目">
    <template #extra>
      <p-button type="link">更多</p-button>
    </template>

    <CardGrid class="w-1/3" v-for="item in GroupList" :key="item.title">
      <span class="flex ">
        <PIcon :icon="item.icon" size="30"></PIcon>
        <span class="ml-4 text-lg">{{ item.title }}</span>
      </span>

      <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
      <div class="flex flex-justify-between text-secondary">
        <span>{{ item.group }}</span>
        <span>{{ item.date }}</span>
      </div>
    </CardGrid>
  </Card>
</template>
  
<script lang='ts' setup>
import { Card, CardGrid } from 'ant-design-vue'
import { GroupList } from './data'
</script>
  
<style lang='less' scoped>
  
</style>