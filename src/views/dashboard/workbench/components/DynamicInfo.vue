<!--
 * @Date: 2024-03-22 16:28:29
 * @LastEditors: phil_litian
-->
<template>
  <Card title="最新动态">
    <template #extra>
      <p-button type="link">更多</p-button>
    </template>
    <List :dataSource="DynamicInfoList">
      <template #renderItem="{ item }">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.name }}  <span v-html="item.desc"></span>
            </template>
            <template #description>
              {{ item.date }}
            </template>
            <template #avatar>
              <p-icon :icon="item.avatar" :size="32"></p-icon>
            </template>
          </ListItemMeta>
        </ListItem>

      </template>
    </List>

  </Card>
</template>
  
<script lang='ts' setup>
import { Card, List } from 'ant-design-vue'
import { DynamicInfoList } from './data'

const ListItem = List.Item
const ListItemMeta = List.Item.Meta
</script>
  
<style lang='less' scoped>
  
</style>