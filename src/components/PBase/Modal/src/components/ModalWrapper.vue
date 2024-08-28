<!--
 * @Date: 2024-04-16 20:45:31
 * @LastEditors: phil_litian
-->
<template>
  <PScrollContainer ref="wrapperRef" :scrollHeight="realHeight">
    <div ref="spinRef" v-loading="loading" :style="spinStyle" :loading-tip="loadingTip">
      <slot></slot>
    </div>
  </PScrollContainer>
</template>
  
<script lang='ts' setup>
  import { propTypes } from '@/utils/propTypes';
  import { computed, CSSProperties, nextTick, ref, unref } from 'vue';
  import { useMutationObserver } from '@vueuse/core';
  import { watchEffect } from 'vue';

  defineOptions({ name: 'ModalWrapper' })
  const props = defineProps({
    loading: propTypes.bool.def(false),
    minHeight: propTypes.number.def(200),
    loadingTip: propTypes.string.def('加载中...'),
    modalHeaderHeight: propTypes.number.def(57),
    modalFooterHeight: propTypes.number.def(74),
    fullScreen: propTypes.bool.def(false)
  })

  const wrapperRef = ref(null)
  const spinRef = ref(null)
  const realHeight = ref(0)
  const realHeightRef = ref(0)

  const spinStyle = computed((): CSSProperties => {
    return {
      minHeight: `${props.minHeight}px`, // 最小高度
      [props.fullScreen ? 'height' : 'maxHeight']: `${unref(realHeightRef)}px`
    }
  })

  useMutationObserver(spinRef, () => {
  }, { attributes: true, subtree: true })

  function scrollTop() {
    const wrapperRefDom = unref(wrapperRef)
    if ( !wrapperRefDom ) return
    (wrapperRefDom as any)?.scrollTo(0)
  }

  async function setModalHeight() {
    const wrapperRefDom = unref(wrapperRef)
    if ( !wrapperRefDom ) return

    const bodyDom = wrapperRefDom.$el.parentElement // body
    if ( !bodyDom ) return
    bodyDom.style.padding = '0'
    await nextTick() // 等页面渲染完
    try {
      // 整个ant-modal
      const modalDom = bodyDom.parentElement && bodyDom.parentElement.parentElement
      if( !modalDom ) return
      const modalRect = getComputedStyle(modalDom).top
      const modalTop = Number.parseInt(modalRect)

      // 最大高度为视口高度 - header高度 - footer高度 - 距离顶部高度的二倍(确保上下间距相同)
      let maxHeight = window.innerHeight - props.modalHeaderHeight - props.modalFooterHeight - modalTop * 2

      realHeightRef.value = maxHeight
    } catch(error) {
      console.error('error', error)
    }
  }


  defineExpose({ scrollTop })

  watchEffect(() => {
    setModalHeight()
  })

</script>
  
<style lang='less' scoped>
  
</style>