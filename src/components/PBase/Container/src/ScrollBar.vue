<!--
 * @Date: 2024-04-10 21:48:35
 * @LastEditors: phil_litian
-->
<template>
  <div class="scrollbar">
    <div 
      ref="wrap"
      :class="['scrollbar__wrap', native ? '' : 'scrollbar__wrap--hidden-default']"
      @scroll="handleScroll">
      <slot></slot>

    </div>

    <template v-if="!native">
      <!-- 横向滚动条 -->
      <Bar :move="moveX" :size="sizeWidth" />

      <!-- 垂直方向滚动条 -->
      <Bar :move="moveY" :size="sizeHeight" vertical /> 
    </template>
  </div>
</template>
  
<script lang='ts' setup>
  import { nextTick, onMounted, ref, unref } from 'vue'
  import { propTypes } from '@/utils/propTypes';
  import componentSetting from '@/settings/componentSetting'
  import Bar from './bar'
  defineOptions({ name: 'ScrollBar' })
  const props = defineProps({
    native: { // 默认不使用原生滚动条
      type: Boolean,
      default: componentSetting.scrollbar.native ?? false
    },
    scrollHeight: propTypes.number.def(0)
  })
  const wrap = ref(null)
  const moveX = ref(0)
  const moveY = ref(0)
  const sizeHeight = ref('0')
  const sizeWidth = ref('0')

  const handleScroll = () => {
    if ( !props.native ) {
      // moveX.value = unref(wrap).scrollLeft * 100
      moveY.value = unref(wrap).scrollTop * 100 / unref(wrap).clientHeight

    }

    console.log('handleScroll', moveY.value);
  }

  function update() {
    if ( !unref(wrap) ) return
    console.log('unref(wrap).clientHeight', unref(wrap).clientHeight);
    
    const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight
    console.log('heightPercentage', heightPercentage);
    
    sizeHeight.value = heightPercentage < 100 ? `${heightPercentage}%` : ''
    
  }

  // 向外暴露当前属性
  defineExpose({ wrap })

  onMounted(() => {
    if ( props.native ) return
    nextTick(update)
  })
</script>
  
<style lang='less'>
  .scrollbar {
    position: relative;
    height: 100%;
    overflow: hidden;

    &__wrap {
      height: 100%;
      overflow: auto;

      &--hidden-default {
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          opacity: 0;
        }
      }
    }

    &__thumb {
      display: block;
      width: 0;
      height: 0;
      background-color: rgb(144 147 153 / 30%);
      cursor: pointer;
    }

    &__bar {
      position: absolute;
      right: 2px;
      bottom: 2px;
      
      &.is-horizontal {

        left: 2px;
        height: 6px;

        & > div {
          height: 100%;
        }
      }

      &.is-vertical {
        top: 2px;
        width: 6px;

        & > div {
          width: 100%;
        }
      }
    }
  }
</style>