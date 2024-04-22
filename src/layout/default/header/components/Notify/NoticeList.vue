<!--
 * @Date: 2024-04-12 14:23:40
 * @LastEditors: phil_litian
-->
<template>
  <List :class="prefixCls">
    <template v-for="item in list" :key="item.id">
      <ListItem class="list-item">
        <ListItemMeta>
          <template #title>
            <div class="title">
              <Typography.Paragraph
                :content="item.title" />

              <div class="extra" v-if="item.extra">
                <Tag :color="item.color">{{ item.extra }}</Tag>
              </div>
            </div>
          </template>

          <template #description>
            <div>

            </div>
          </template>

          <template #avatar>
            <Avatar v-if="item.avatar" class="avatar" :src="item.avatar" />
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>
  
<script lang='ts' setup>
  import { List, Avatar, Typography, Tag } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { PropType } from 'vue';
  import type { ListItem } from './data';
  const ListItem = List.Item
  const ListItemMeta = List.Item.Meta
  const props = defineProps({
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => []
    }
  })
  const { prefixCls } = useDesign('header-notify-list')
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-header-notifu-list';

  .@{prefix-cls} {
    
  }
</style>