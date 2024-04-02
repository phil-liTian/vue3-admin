<!--
 * @Date: 2024-03-26 22:20:53
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getWrapClass">
    <Tabs type="editable-card">
      <TabPane v-for="item in 1" :key="item">
        <template #tab>
          cccc
        </template>
      </TabPane>

      <template #rightExtra>
        <!-- 项目设置 -->
        <SettingButton />
        <!-- 刷新 -->
        <TabRedo />
        <!-- 操作tabs -->
        <TabContent />
        <!-- 控制全屏 -->
        <FoldButton />
      </template>
    </Tabs>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { Tabs } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { SettingButton, TabRedo, FoldButton, TabContent } from './components/index'
  const { prefixCls } = useDesign('multipe-tabs')
  const TabPane = Tabs.TabPane
  const getWrapClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  
</style>