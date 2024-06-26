<!--
 * @Date: 2024-02-24 13:03:36
 * @LastEditors: phil_litian
-->
<template>
  <SvgIcon
    :size='size'
    :name="getSvgIcon"
    v-if="isSvgIcon">
  </SvgIcon>
  <span 
    v-else
    ref="elRef"
    :class="['app-iconify','anticon']"
    :style="getWrapStyle">
  </span>
</template>
  
<script lang='ts' setup>
  import { computed, CSSProperties, onMounted, unref, ref, watch } from 'vue'
  import type { PropType } from 'vue'
  // 当前包可根据ion生成一个图标
  import Iconfiy from '@purge-icons/generated'
  import SvgIcon from './src/SvgIcon.vue';
  const SVG_END_WITH_FLAG = '|svg'

  defineOptions({
    name: 'PIcon'
  })
  const props = defineProps({
    icon: String,
    color: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  })

  const elRef = ref(null);
  // 标识是否是svg icon
  const isSvgIcon = computed(() => props.icon.endsWith(SVG_END_WITH_FLAG))
  const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
  const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : '' }${props.icon}`)

  const update = () => {
    if( unref(isSvgIcon) ) return
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
    const { color, size } = props
    return {
      display: 'inline-flex',
      color,
      fontSize: `${size}px`
    }
  })
  // flush控制何时运行watch的回调函数
  // pre 在侦听器的回调函数运行之前立即执行更新函数（dom渲染完毕之前执行）
  // post 在下一次dom更新之后执行
  // sync 更改被触发时 立即执行
  watch(() => props.icon, update, { flush: 'post' })
  onMounted(update)
</script>
  
<style lang='less' scoped>
  
</style>