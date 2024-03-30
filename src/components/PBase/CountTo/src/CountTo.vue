<!--
 * @Date: 2024-03-28 09:32:06
 * @LastEditors: phil_litian
-->
<template>
  <span :class="getClass" :style="{ color, fontSize: `${fontSize}px` }">
    {{ value }}
  </span>
</template>
  
<script lang='ts' setup>
  import { computed, onMounted, ref, unref, watch } from 'vue'
  import { useTransition, TransitionPresets } from '@vueuse/core'
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@u/propTypes'
  import { isNumber } from '@u/is'
  defineOptions({ name: 'PCountTo' })

  const props = defineProps({
    endVal: propTypes.number.def(2024),
    startVal: propTypes.number.def(0),
    duration: propTypes.number.def(1500),
    color: propTypes.string.def(''),
    // 支持小数位数控制
    decimals: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0
    },
    decimal: propTypes.string.def('.'),
    size: {
      type: String,
      default: 'middle',
      validator: (val: string) => ['small', 'middle', 'large'].includes(val)
    },
    fontSize: propTypes.number,
    prefix: propTypes.string.def(''),
    suffix: propTypes.string.def(''),
    transition: propTypes.string.def('linear'),
    useEasing: propTypes.bool.def(true),
    autoPlay: propTypes.bool.def(true),
    separator: propTypes.string.def(',')
  })

  const emits = defineEmits(['onStarted', 'onFinished'])

  const source = ref(props.startVal)
  let outputVal = useTransition(source)
  const { prefixCls } = useDesign('count-to')

  const value = computed(() => formatNumber(unref(outputVal)))

  function start() {
    run()
    source.value = props.endVal
  }

  function run() {
    outputVal = useTransition(source, {
      duration: props.duration,
      onStarted: () => emits('onStarted'),
      onFinished: () => emits('onFinished'),
      // 预设动画
      ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {})
    })
  }

  function formatNumber(num: number | string) {
    if ( !num && num !== 0 ) {
      return ''
    }
    const { decimals, prefix, suffix, decimal, separator } = props
    num = Number(num).toFixed(decimals)
    num += '' // 转成字符串处理
    // 处理千分位分割
    const x = num.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? `${decimal}${x[1]}` : ''
    const rgx = /(\d+)(\d{3})/

    // 分离出千分位
    if ( separator && !isNumber(separator) ) {
      while(rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + separator + '$2')
      }
    }

    return `${prefix}${x1}${x2}${suffix}`
  }

  const getClass = computed(() => {
    return [
      `${prefixCls}`,
      `${prefixCls}-${props.size}`
    ]
  })

  onMounted(() => {
    // endVal初始化时就有
    props.autoPlay && start()
  })

  watch([() => props.startVal, () => props.endVal], () => {
    props.autoPlay && start()
  })


</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-count-to';

  .@{prefix-cls} {
    &-small {
      font-size: @font-small-size;
    }

    &-middle {
      font-size: @font-middle-size;
    }

    &-large {
      font-size: @font-large-size;
    }
  }

</style>