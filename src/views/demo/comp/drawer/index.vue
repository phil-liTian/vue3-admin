<!--
 * @Date: 2024-04-12 13:42:16
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="抽屉组件">
    <Alert message="使用useDrawer进行抽屉操作" show-icon />
    <PButton class="my-4" type="primary" @click="openDrawerLoading">打开Drawer</PButton>
    <Alert message="内外同时控制显示隐藏" show-icon />
    <PButton class="my-4" type="primary" @click="openDrawer2(true)">打开Drawer</PButton>
    <Alert message="详情页模式" show-icon></Alert>
    <PButton class="my-4" type="primary" @click="openDrawer3(true)">打开详情Drawer</PButton>
    <Alert message="内外数据交互" show-icon></Alert>
    <PButton type="primary" class="my-2" @click="openDrawer4(true)">打开Drawer并传递数据</PButton>
    <Alert message="根据屏幕自适应高度" show-icon></Alert>
    <PButton type="primary" class="my-2" @click="openDrawer5(true)">打开Drawer</PButton>
    
    <Drawer1 @register="register1" />
    <Drawer2 @register="register2" />
    <Drawer3 @register="register3" />
    <Drawer4 @register="register4" />
    <Drawer5 @register="register5" />
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue'
  import { useDrawer } from '@c/PBase/Drawer/index'
  import Drawer1 from './Drawer1.vue'
  import Drawer2 from './Drawer2.vue'
  import Drawer3 from './Drawer3.vue'
  import Drawer4 from './Drawer4.vue'
  import Drawer5 from './Drawer5.vue'
  defineOptions({ name: 'DrawerDemo' })

  const [register1, { openDrawer: openDrawer1, setDrawerProps }] = useDrawer()
  const [register2, { openDrawer: openDrawer2 }] = useDrawer()
  const [register3, { openDrawer: openDrawer3 }] = useDrawer()
  const [register4, { openDrawer: openDrawer4 }] = useDrawer()
  const [register5, { openDrawer: openDrawer5 }] = useDrawer()


  const openDrawerLoading = () => {
    openDrawer1(true)
    setDrawerProps({ loading: true })
    setTimeout(() => {
      setDrawerProps({ loading: false })
    }, 2000);
  }
</script>
  
<style lang='less' scoped>
  
</style>