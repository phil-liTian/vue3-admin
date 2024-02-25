<!--
 * @Date: 2024-02-24 13:03:36
 * @LastEditors: phil_litian
-->
<template>
  <span 
    ref="elRef"
    :style="getWrapStyle">
  </span>
</template>
  
<script lang='ts' setup>
  import { computed, CSSProperties, onMounted, unref, ref } from 'vue'
  import type { PropType } from 'vue'
  // 当前包可根据ion生成一个图标
  import Iconfiy from '@purge-icons/generated'
  const props = defineProps({
    icon: String,
    color: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    }
  })

  const elRef = ref(null);
  const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : '' }${props.icon}`)

  const update = () => {
    const icon = unref(getIconRef)
    const el = unref(elRef)

    // 渲染一个svg元素
    const svg = Iconfiy.renderSVG(icon, {})

    if ( svg ) {
      el.textContent = ''
      el.appendChild(svg) 
    } else {
      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      el.textContent = '';
      el.appendChild(span);
    }
    
  }

  const getWrapStyle = computed((): CSSProperties => {
    const { color } = props
    return {
      display: 'inline-flex',
      color,
      fontSize: '16px'
    }
  })

  onMounted(update)
</script>
  
<style lang='less' scoped>
  
</style>