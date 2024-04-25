<!--
 * @Date: 2024-03-28 17:49:37
 * @LastEditors: phil_litian
-->
<template>
  <ScrollBar 
    ref="scrollbarRef"
    v-bind="$attrs"
    class="scroll-container"
    :scroll-height="scrollHeight">
    <slot></slot>
  </ScrollBar>
</template>
  
<script lang='ts' setup>
  import { ref, unref } from 'vue';
  import { propTypes } from '@/utils/propTypes';
  import { useScrollTo } from '@phil/hooks'
  import ScrollBar from './ScrollBar.vue'
  defineOptions({ name: 'PScrollContainer' })
  defineProps({
    scrollHeight: propTypes.number
  })
  const scrollbarRef = ref()

  function getScrollWrap() {
    const scrollbar = unref(scrollbarRef)
    if ( !scrollbar ) return null

    return scrollbar.wrap
  }

  // 滚动到指定位置
  function scrollTo(to: number, duration: 500) {
    const wrap = unref(getScrollWrap())
    if ( !wrap ) return

    const { start } = useScrollTo({ el: wrap, to, duration })
    
    start()
  }

  // 滚动到底部位置
  function scrollBottom() {
    const wrap = unref(getScrollWrap())
    if ( !wrap ) return
    const scrollHeight = wrap.scrollHeight
    
    const { start } = useScrollTo({
      el: wrap,
      to: scrollHeight
    })
    start()
  }
  
  defineExpose({ scrollTo, scrollBottom })
</script>
  
<style lang='less' scoped>
  .scroll-container {
    height: 100%;
  }
</style>