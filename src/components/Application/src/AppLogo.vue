<!--
 * @Date: 2024-02-22 14:52:53
 * @LastEditors: phil_litian
-->
<template>
  <div @click="goHome" :class="getAppLogoClass">
    <div :class="getTitleClass">title</div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, defineProps } from 'vue'
  import { useGo } from '@h/web/usePage'
  import { useDesign } from '@h/web/useDesign'
  const { prefixCls } = useDesign('app-logo')
  const { go } = useGo()

  const props = defineProps({

  })

  // applogo的类
  const getAppLogoClass = computed(() => {
    return [
      prefixCls
    ]
  })

  // title的类
  const getTitleClass = computed(() => {
    return [
      `${prefixCls}__title`
    ]
  })

  const goHome = () => {
    go()
  }
</script>
  
<style lang='less' scoped>
  
</style>