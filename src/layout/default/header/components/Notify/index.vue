<!--
 * @Date: 2024-04-12 14:23:22
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls">
    <Popover>
      <Badge dot>
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in dataList" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length">{{ item.list.length }}</span>
              </template>

              <!-- 通知 -->
              <NoticeList :list="item.list" />
            </TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { Popover, Badge, Tabs } from 'ant-design-vue'
  import { BellOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { tabListData } from './data'
  import NoticeList from './NoticeList.vue'

  const TabPane = Tabs.TabPane

  const { prefixCls } = useDesign('header-notify')
  const dataList = ref(tabListData)
</script>
  
<style lang='less' scoped>
  
</style>