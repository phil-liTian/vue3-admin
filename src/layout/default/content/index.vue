<!--
 * @Date: 2024-03-03 10:27:38
 * @LastEditors: phil_litian
-->
<template>
  <div :class="[prefixCls]" ref="content">
    <PageLayout />
    <BackTop :target="() => content" :visibilityHeight="100" />
  </div>
</template>
  
<script lang='ts' setup>
import { ref } from 'vue'
import { BackTop } from 'ant-design-vue'
import PageLayout from '@/layout/page/index.vue'
import { useDesign } from '@h/web/useDesign'
const { prefixCls } = useDesign('layout-content')

const content = ref()
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    // 创建一个可伸展的容器元素，使其能够根据容器的大小自适应地伸展，并保持最小高度为 0。这样可以在布局中灵活地分配空间，同时确保元素不会占用不必要的空间。
    flex-grow: 1;
    height: 0;
    min-height: 0;
    overflow-y: auto;
    
  }
</style>