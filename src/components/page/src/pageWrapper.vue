<!--
 * @Date: 2024-03-20 21:46:20
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass" class='font-size-12px' ref="wrapperRef">
    <PageHeader 
      ref="headerRef"
      :title="title"
      :style="getHeaderStyle"
      v-if="getShowHeader">
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="headerContent"></slot>
      </template>
    </PageHeader>

    <div ref="contentRef" :class="getContentClass" :style="getContentStyle"><slot></slot></div>

    <page-footer ref="footerRef">
      <template #left><slot name="leftFooter"></slot></template>
      <template #right><slot name="rightFooter"></slot></template>
    </page-footer>
  </div>
</template>
  
<script lang='ts' setup>
import { computed, CSSProperties, ref, unref, useSlots } from 'vue'
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
  content: propTypes.string,
  // conten是否全屏
  contentFullHeight: propTypes.bool.def(false),
  // 去除content的margin边距
  dense: propTypes.bool.def(false),
  fixedHeight: propTypes.bool.def(false)
})

const slots = useSlots()

const wrapperRef = ref(null)
const headerRef = ref(null)
const footerRef = ref(null)
const contentRef = ref(null)

const getClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--dense`]: props.dense
    }
  ]
})

const getIsContentFullHeight = computed(() => props.contentFullHeight)
const getShowHeader = computed(() => slots.headerContent || props.title)

const { contentHeight } = useContentHeight(
  getIsContentFullHeight,
  wrapperRef,
  [headerRef, footerRef],
  [contentRef]
)

// 内容样式
const getContentStyle = computed((): CSSProperties => {
  
  return {
    height: `${unref(contentHeight)}px`
  }
})

// 顶部样式
const getHeaderStyle = computed((): CSSProperties => {
  return {
    position: 'sticky',
    top: 0,
    zIndex: 99
  }
})

// 内容class
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
  @prefixCls: ~'@{namespace}-page-wrapper';
  @prefix-cls-content: ~'@{namespace}-page-wrapper-content';
  .@{prefixCls} {
    width: 100%;

    .@{prefix-cls-content} { 
      margin: 16px;
    }

    &--dense {
      .@{prefix-cls-content} {
        margin: 0;
      }
    }

    &-content-bg {
      background-color: @component-background;
    }

    .ant-page-header {
      background-color: #fff;
    }
  }
</style>