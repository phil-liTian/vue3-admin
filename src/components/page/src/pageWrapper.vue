<!--
 * @Date: 2024-03-20 21:46:20
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass">
    <PageHeader 
      :title="title"
      :style="getHeaderStyle">
      <template #default>
        <slot name="headerContent"></slot>
      </template>
    </PageHeader>

    <div :class="getContentClass" :style="getContentStyle"><slot></slot></div>

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
import { propTypes } from '@u/propTypes'
import PageFooter from './pageFooter.vue';
import { useContentHeight } from '@h/web/useContentHeight'
const { prefixCls } = useDesign('page-wrapper')

defineOptions({ name: 'PageWrapper' })
const props = defineProps({
  contentBackground: propTypes.bool,
  title: propTypes.string,
})

const getClass = computed(() => {
  return [
    prefixCls
  ]
})

// const { contentHeight } = useContentHeight()

const getContentStyle = computed((): CSSProperties => {
  return {
    width: 'calc(100% - 32px)',
    height: '1000px'
  }
})

const getHeaderStyle = computed((): CSSProperties => {
  return {
    position: 'sticky',
    top: 0,
    zIndex: 99
  }
})

const getContentClass = computed(() => {
  const { contentBackground } = props
  return [
    `${prefixCls}-content`,
    {
      [`${prefixCls}-content-bg`]: contentBackground
    }
  ]
})

</script>
  
<style lang='less' scoped>
  @prefix-cls-wrapper: ~'@{namespace}-page-wrapper';
  @prefix-cls-content: ~'@{namespace}-page-wrapper-content';
  

  .@{prefix-cls-wrapper} {
    width: 100%;
    height: 500px;

    .@{prefix-cls-content} { 
      margin: 16px;
    }

    .ant-page-header {
      background-color: #fff;
    }
  }
</style>