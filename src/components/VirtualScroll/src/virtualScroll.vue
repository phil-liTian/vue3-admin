<!--
 * @Date: 2024-04-23 15:17:55
 * @LastEditors: phil_litian
-->

<script lang="tsx">
  import { getSlot } from "@/utils/helper/tsxHelper";
  import { isString } from "@/utils/is";
  import { useEventListener } from '@h/event/useEventListener'
  import { ref, computed, CSSProperties, defineComponent, onMounted, PropType, reactive, unref, nextTick } from "vue";

  type NumberOrNumberString = PropType<number | string | undefined>

  const props = {
    width: [Number, String] as NumberOrNumberString,
    height: [Number, String] as NumberOrNumberString,
    minWidth: [Number, String] as NumberOrNumberString,
    minHeight: [Number, String] as NumberOrNumberString,
    maxWidth: [Number, String] as NumberOrNumberString,
    maxHeight: [Number, String] as NumberOrNumberString,


    items: {
      type: Array,
      default: () => []
    },

    // 预先加载的条数
    bench: {
      type: [Number, String] as NumberOrNumberString,
      default: 0
    },

    // 每个item的高度
    itemHeight: {
      type: [Number, String] as NumberOrNumberString,
      require: true
    }

  }

  function covertToUnit(str: string | number | undefined | null, unit = 'px'): string | undefined {
    if ( str == null || str == '' ) {
      return undefined
    } else if(isString(str)) {
      return str.toString()
    } else {
      return `${Number(str)}${unit}`
    }
  }

  export default defineComponent({
    props,
    setup(props, { slots }) {
      const prefixCls = 'virtual-scroll'
      const wrapElRef = ref<Nullable<HTMLDivElement>>(null)
      const state = reactive({
        first: 0,
        last: 0,
        scrollTop: 0
      })

      const getBenchRef = computed(() => {
        return parseInt(props.bench as string, 10)
      })

      const getItemHeightRef = computed(() => {
        return parseInt(props.itemHeight as string, 10)
      })

      const getContainerStyleRef = computed(() => {
        return {
          height: covertToUnit((props.items || []).length * unref(getItemHeightRef))
        }
      })

      const getWrapStyleRef = computed(() => {
        let styles: CSSProperties = {}
        const height = covertToUnit(props.height)
        const width = covertToUnit(props.width)
        const minWidth = covertToUnit(props.minWidth)
        const maxWidth = covertToUnit(props.maxWidth)
        const minHeight = covertToUnit(props.minHeight)
        const maxHeight = covertToUnit(props.maxHeight)

        if ( width ) styles.width = width
        if ( height ) styles.height = height
        if ( minWidth ) styles.minWidth = minWidth
        if ( maxWidth ) styles.maxWidth = maxWidth
        if ( minHeight ) styles.minHeight = minHeight
        if ( maxHeight ) styles.maxHeight = maxHeight

        return styles
      })

      // 首先加载的条数
      const getFirstToRenderRef = computed(() => {
        return Math.max(0, state.first - getBenchRef.value)
      })

      // 最后加载的条数
      const getLastToRenderRef = computed(() => {
        return Math.min(props.items.length, state.last + getBenchRef.value)
      })

      function renderChildren() {
        return props.items.slice(unref(getFirstToRenderRef), unref(getLastToRenderRef)).map(genChild)
      }

      // 自定义slot
      function genChild(item: any, index: number) {
        index += unref(getFirstToRenderRef)
        const top = covertToUnit(index * unref(getItemHeightRef))

        return <div style={{ top }} class={`${prefixCls}__item`}>
          { getSlot(slots, 'default', { item, index }) }
        </div>
      }

      function getFirst(): number {
        return Math.floor(state.scrollTop / unref(getItemHeightRef))
      }

      function getLast(first: number) {
        const wrapEl = unref(wrapElRef)
        if ( !wrapEl ) return 0
        const height = parseInt((props.height || 0) as any, 10) || wrapEl.clientHeight

        return first + Math.ceil(height / unref(getItemHeightRef))
      }

      function onScroll() {
        const wrapEl = unref(wrapElRef)
        if ( !wrapEl ) return
        state.scrollTop = wrapEl.scrollTop
        state.first = getFirst()
        state.last = getLast(state.first)
      }

      onMounted(() => {
        state.last = getLast(0)
        nextTick(() => {
          const wrapEl = unref(wrapElRef)
          if ( !wrapEl ) return
          useEventListener({
            el: wrapEl,
            name: 'scroll',
            listener: onScroll,
            wait: 0,
          })
        })
      })

      return () => (<div class={prefixCls} ref={wrapElRef} style={unref(getWrapStyleRef)}>
        <div class={`${prefixCls}__container`} style={unref(getContainerStyleRef)}>
          { renderChildren() }
        </div>
      </div>)
    }
  })
</script>

<style lang="less" scoped>
  .virtual-scroll {
    position: relative;
    overflow: auto;
    &__container {

    }

    &__item {
      position: absolute;
      left: 0;
      right: 0;
    }
  }
</style>
