<!--
 * @Date: 2024-03-28 10:32:17
 * @LastEditors: phil_litian
-->
<template>
  <Drawer
    :class="prefixCls"
    v-model:open="open">
    <!-- title -->
    <template #title v-if="$slots.title">
      <DrawerHeader title="测试title"></DrawerHeader>
    </template>

    <template v-else #title>
      {{ title }}
    </template>

    <!-- container -->
    <p-scroll-container :style="getScrollContainerStyle">
      <slot></slot>

    </p-scroll-container>

    <!-- footer -->
    <DrawerFooter />
  </Drawer>
</template>
  
<script lang='ts' setup>
  import { Drawer } from 'ant-design-vue'
  import { ref, computed, CSSProperties, unref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import DrawerFooter from "./components/DrawerFooter.vue"
  import DrawerHeader from "./components/DrawerHeader.vue"
  import { basicProps } from './props'
  defineOptions({ name: 'PDrawer' })
  defineProps(basicProps)

  const open = ref(true)
  const { prefixCls } = useDesign('basic-drawer')

  // footer高度
  const getFooterHeight = computed(() => {
    return '0px'
  })

  const getScrollContainerStyle = computed((): CSSProperties => {
    const footerHeight = unref(getFooterHeight)
    return {
      height: `calc(100% - ${footerHeight})`
    }
  })


</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-drawer';
  @header-height: 60px;


  .@{prefix-cls} {
    .ant-drawer-body {
      height: calc(100% - @header-height);
      padding: 0;
    }
  }
</style>