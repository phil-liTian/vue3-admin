<!--
 * @Date: 2024-03-22 16:37:23
 * @LastEditors: phil_litian
-->
<template>
  <Card title="快捷导航">
    <CardGrid v-for="navItem in navList" :key="navItem.title">
      <span class="flex flex-col items-center">
        <p-icon :icon="navItem.icon" :size="20" :color="navItem.color"></p-icon>
        <span class="mt-2 truncate">{{ navItem.title }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
  
<script lang='ts' setup>
import { Card, CardGrid } from 'ant-design-vue'
import { navList } from './data'
</script>
  
<style lang='less' scoped>
  
</style>