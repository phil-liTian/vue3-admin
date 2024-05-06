<!--
 * @Date: 2024-04-30 14:58:57
 * @LastEditors: phil_litian
-->
  
<script lang='tsx'>
  import { computed, defineComponent, unref, ref, reactive, watch, watchEffect } from "vue";
  import { CheckOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
  import { basicProps } from './props'
  import { getSlot } from "@/utils/helper/tsxHelper";
  import { useTimeoutFn } from "@vueuse/core";
  export default defineComponent({
    name: 'BaseDragVerify',
    props: basicProps,
    emits: ['success', 'update:value', 'start', 'end', 'move'],
    setup(props, { slots, expose, emit }) {
      const wrapElRef = ref<Nullable<HTMLDivElement>>(null)
      const barElRef = ref<Nullable<HTMLDivElement>>(null)
      const actionElRef = ref<Nullable<HTMLDivElement>>(null)
      const contentElRef = ref<Nullable<HTMLDivElement>>(null)
      const state = reactive({
        isPassing: false,
        toLeft: false,
        moveDistance: 0,
        isMoving: false,
        startTime: 0,
        endTime: 0
      })

      watch(() => state.isPassing, (val) => {
        if( val ) {
          const { startTime, endTime } = state
          const time = (endTime - startTime) / 1000
          emit('success', { time: time.toFixed(1), isPassing: val })
          emit('update:value', val)
        }
      })

      watchEffect(() => {
        state.isPassing = !!props.value
      })

      function getEventPageX(e: MouseEvent) {
        return e.pageX
      }

      function handleDragStart(e: MouseEvent) {
        if ( state.isPassing ) return
        const actionEl = unref(actionElRef)
        if ( !actionEl ) return
        // 移动的距离
        emit('start', e)
        state.moveDistance = getEventPageX(e) - parseInt(actionEl.style.left.replace('px', ''))
        state.startTime = Date.now()
        state.isMoving = true
      }

      function getOffset(el: HTMLDivElement) {
        const { width } = props
        const widthNum = parseInt(width as string)
        const actionWidth = parseInt(el.style.width)
        const offset = widthNum - actionWidth
        return { offset, widthNum, actionWidth }
      }

      function handleDragMove(e) {
        const { isMoving, moveDistance } = state
        if ( isMoving ) {
          const actionEl = unref(actionElRef)
          const barEl = unref(barElRef)
          if ( !actionEl || !barEl ) return
          const { offset, widthNum, actionWidth } = getOffset(actionEl)
          const moveX = getEventPageX(e) - moveDistance
          emit('move', {
            event: e,
            moveDistance,
            moveX
          })
          if ( moveX > 0 && moveX <= offset ) {
            actionEl.style.left = `${moveX}px`
            barEl.style.width = `${ moveX + actionWidth / 2 }px`
          } else {

          }
        }
      }

      function handleDragOver(e: MouseEvent) {
        const { isMoving, moveDistance } = state
        if ( isMoving ) {
          emit('end', e)
          const actionEl = unref(actionElRef)
          const barEl = unref(barElRef)
          if ( !actionEl || !barEl ) return
          const moveX = getEventPageX(e) - moveDistance
          const { offset, actionWidth, widthNum } = getOffset(actionEl)
          if ( moveX < offset ) {
            // 还没有拖到最后, 返回初始状态
            setTimeout(() => {
              if ( !props.value ) {
                resume()
              } else {
                const contentEl = unref(contentElRef)
                if( contentEl )  {
                  contentEl.style.width = `${parseInt(barEl.style.width)}px`
                }
              }
            }, 100);
            
          } else {
            checkPass()
          }

          state.isMoving = false
        }
      }

      function resume() {
        state.isMoving = false
        state.isPassing = false
        state.toLeft = false
        state.moveDistance = 0
        state.startTime = 0
        state.endTime = 0
        const actionEl = unref(actionElRef)
        const barEl = unref(barElRef)
        const contentEl = unref(contentElRef)
        if ( !actionEl || !barEl || !contentEl ) return
        state.toLeft = true
        useTimeoutFn(() => {
          // 动态控制to-left class
          state.toLeft = false
        }, 300)
        actionEl.style.left = '0'
        barEl.style.width = '0'
      }

      // 已完成
      function checkPass() {
        state.endTime = Date.now()
        state.isPassing = true
        state.isMoving = false
      }

      const getWrapStyleRef = computed(() => {
        const { width, height, circle, wrapStyle } = props
        const w = `${parseInt(width as string)}px`
        const h = parseInt(height as string)
        return {
          width: w,
          height: `${h}px`,
          lineHeight: `${h}px`,
          borderRadius: circle ? `${h / 2}px` : 0,
          ...wrapStyle
        }
      })

      const getContentStyleRef = computed(() => {
        const { width, height } = props
        const w = `${parseInt(width as string)}px`
        const h = `${parseInt(height as string)}px`
        return {
          width: w,
          height: h
        }
      })

      const getActionStyleRef = computed(() => {
        const { height, actionStyle } = props
        const h = `${parseInt(height as string)}px`
        return {
          left: 0,
          width: h,
          height: h,
          ...actionStyle
        }
      })

      const getBarStyleRef = computed(() => {
        const { height, barStyle, circle } = props
        const h = parseInt(height as string)
        return {
          height: `${h}px`,
          borderRadius: circle ? `${h / 2}px 0 0 ${h / 2}px` : 0,
          ...barStyle
        }
      })

      expose({ resume })
      return () => {
        // 划过的区域
        function renderBar() {
          const { toLeft } = state
          const cls = ['drag-verify-bar']
          if ( toLeft ) {
            cls.push('to-left')
          }
          return <div style={unref(getBarStyleRef)} ref={barElRef} class={cls}></div>
        }

        // 内容区域 校验通过时 展示successText
        function renderContent() {
          const cls = ['drag-verify-content']
          const { isPassing } = state
          isPassing && cls.push('success')
          const { successText, text } = props
          return <div ref={contentElRef} style={unref(getContentStyleRef)} class={cls}>
            { getSlot(slots, 'text', { isPassing }) || (isPassing ? successText : text) }
          </div>
        }

        // 拖动的小块
        function renderAction() {
          let cls = ['drag-verify-action']
          const { isPassing, toLeft } = state
          if ( toLeft ) {
            cls.push('to-left')
          }
          return (
            <div 
              onMousedown={handleDragStart}
              onTouchstart={handleDragStart}
              ref={actionElRef} 
              style={unref(getActionStyleRef)} 
              class={cls}>
              { getSlot(slots, 'actionIcon', { isPassing }) || (isPassing ? <CheckOutlined class='drag-verify-action__icon' /> : <DoubleRightOutlined class='drag-verify-action__icon' />)} 
            </div>
          )
        }

        return <div 
          ref={wrapElRef}
          onMousemove={handleDragMove}
          onTouchmove={handleDragMove}
          onMouseup={handleDragOver}
          onMouseleave={handleDragOver}
          style={unref(getWrapStyleRef)}
          class='drag-verify'>
          { renderBar() }
          { renderContent() }
          { renderAction() }
        </div>
      }
    }
  })
</script>
  
<style lang='less' scoped>
  @radius: 4px;

  .drag-verify {
    position: relative;
    overflow: hidden;
    background-color: rgb(238 238 238);
    border-radius: @radius;
    border: 1px solid #ddd;
    text-align: center;

    &-bar {
      position: absolute;
      width: 0;
      height: 36px;
      background: @success-color;
      border-radius: @radius;

      &.to-left {
        width: 0 !important;
        transition: width .3s;
      }
    }

    &-content {
      position: absolute;
      top: 0;
      animation: slidetounlock 3s infinite;
      font-size: 12px;
      background-color: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0, #333),
        color-stop(0.4, #333),
        color-stop(0.5, #fff),
        color-stop(0.6, #333),
        color-stop(1, #333)
      );
      user-select: none;
      text-align: center;

      &.success {
        -webkit-text-fill-color: @white;
      }
    }


    &-action {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: @white;
      cursor: move;

      &.to-left {
        left: 0 !important;
        transition: all .3s;
      }

      &__icon {
        cursor: inherit;
      }
    }
  }

  @keyframes slidetounlock {
    0% {
      background-position: -120px 0;
    }

    100% {
      background-position: 120px 0;
    }
  }
</style>