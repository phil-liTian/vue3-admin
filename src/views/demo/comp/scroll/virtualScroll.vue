<!--
 * @Date: 2024-04-23 14:58:18
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper class="virtual-scroll-demo" title="虚拟列表">
    <Divider>基础滚动示例</Divider>
    <div class="virtual-scroll-demo-wrap">
      <VScroll :height="300" :width="300" :item-height="41" :items="data">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </div>

    <Divider>即使不可见，也预先加载50条</Divider>
    <div class="virtual-scroll-demo-wrap">
      <VScroll :height="300" :width="300" :item-height="41" :items="data" :bench="20">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">
            {{ item.title }}
          </div>
        </template>
      </VScroll>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Divider } from 'ant-design-vue'
  import { VScroll } from '@c/VirtualScroll/index'

  const data = (() => {
    const arr: any[] = []

    for (let i = 0; i < 200; i++) {
      arr.push({
        title: `列表项: ${i + 1}`
      })
    }

    return arr
  })()

</script>
  
<style lang='less' scoped>
  .virtual-scroll-demo {
    &-wrap {
      background-color: @component-background;
    }

    &__item {
      height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid @border-color-base;
      line-height: 40px;
    }
  }
</style>