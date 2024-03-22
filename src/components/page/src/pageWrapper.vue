<!--
 * @Date: 2024-03-20 21:46:20
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass">
    <PageHeader>
      <template #default>
        <slot name="headerContent"></slot>
      </template>
    </PageHeader>

    <div :style="getContentStyle"></div>

    <page-footer>
      <template #left><slot name="leftFooter"></slot></template>
      <template #right><slot name="rightFooter"></slot></template>
    </page-footer>
  </div>
</template>
  
<script lang='ts' setup>
import { computed, CSSProperties } from 'vue'
import { PageHeader } from 'ant-design-vue'
import { useDesign } from '@h/web/useDesign'
import PageFooter from './pageFooter.vue';
import { useContentHeight } from '@h/web/useContentHeight'
const { prefixCls } = useDesign('page-wrapper')

const getClass = computed(() => {
  return [
    prefixCls
  ]
})

// const { contentHeight } = useContentHeight()

const getContentStyle = computed((): CSSProperties => {
  return {
    
  }
})

</script>
  
<style lang='less' scoped>
  
</style>