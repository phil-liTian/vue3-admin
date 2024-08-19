<!--
 * @Date: 2024-03-26 22:20:53
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getWrapClass">
    <Tabs 
      :hide-add="true"
      :animated="false"
      size="small"
      :active-key="activeKeyRef"
      :tab-bar-gutter="3"
      type="editable-card"
      @change="handleChange"
      @edit="handleEdit">
      <TabPane :closable="!( item && item.meta && item.meta.affix )" v-for="item in getTabState" :key="item.path">
        <template #tab>
          <TabContent :tab-item="item" />
        </template>
      </TabPane>

      <template #rightExtra>
        <!-- 项目设置 -->
        <SettingButton />
        <!-- 刷新 -->
        <TabRedo v-if="getShowRedo" />
        <!-- 操作tabs -->
        <TabContent isExtra v-if="getShowFold" />
        <!-- 控制全屏 -->
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref, unref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Tabs } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useGo } from '@h/web/usePage'
  import { useMultipleTabSetting } from '@h/setting/useMultipleTabSetting'
  import { useTabs } from '@s/modules/tabs'
  import { SettingButton, TabRedo, FoldButton, TabContent } from './components/index'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  const { prefixCls } = useDesign('multiple-tabs')
  const TabPane = Tabs.TabPane
  const tabStore = useTabs()
  const { getTabList, addTab, closeTabByKey } = useTabs()
  const { getShowFold, getShowQuick, getShowRedo } = useMultipleTabSetting()
  const { go } = useGo()
  const router = useRouter()
  const activeKeyRef = ref('')

  const getTabState = computed(() => {
    return tabStore.getTabList
  })
  
  // 最少保留一个
  const unClose = computed(() => unref(getTabList).length === 1)
  const getWrapClass = computed(() => {
    return [
      prefixCls
    ]
  })

  const handleChange = (activeKey: any) => {
    go(activeKey)
  }

  const handleEdit = (e) => {
    if(unref(unClose)) return
    closeTabByKey(e, router)
  }

  listenerRouteChange((route) => {
    const { path, fullPath } = route

    activeKeyRef.value = path

    addTab(route)
  })
</script>
  
<style lang='less'>
  @import './index.less';
</style>