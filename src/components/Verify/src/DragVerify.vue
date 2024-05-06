<!--
 * @Date: 2024-04-30 14:58:57
 * @LastEditors: phil_litian
-->
  
<script lang='tsx'>
  import { computed, defineComponent, unref, ref, reactive } from "vue";
  import { CheckOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
  import props from './props'
  export default defineComponent({
    props,
    setup(props, { slots }) {
      const wrapElRef = ref<Nullable<HTMLDivElement>>(null)
      const barElRef = ref<Nullable<HTMLDivElement>>(null)
      const actionElRef = ref<Nullable<HTMLDivElement>>(null)
      const contentElRef = ref<Nullable<HTMLDivElement>>(null)
      const state = reactive({
        isPassing: false,
        toLeft: false
      })
      const getWrapStyleRef = computed(() => {
        const { width, height, circle } = props
        const w = `${parseInt(width as string)}px`
        const h = parseInt(height as string)
        return {
          width: w,
          height: `${h}px`,
          lineHeight: `${h}px`,
          borderRadius: circle ? `${h / 2}px` :0
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
        const { height } = props
        const h = `${parseInt(height as string)}px`
        return {
          left: 0,
          width: h,
          height: h
        }
      })

      return () => {
        // 划过的区域
        function renderBar() {
          const cls = ['drag-verify-bar']
          return <div ref={barElRef} class={cls}></div>
        }

        // 内容区域 校验通过时 展示successText
        function renderContent() {
          const cls = ['drag-verify-content']
          const { isPassing } = state
          const { successText, text } = props
          return <div ref={contentElRef} style={getContentStyleRef} class={cls}>
            { isPassing ? successText : text }
          </div>
        }

        // 拖动的小块
        function renderAction() {
          let cls = ['drag-verify-action']
          const { isPassing } = state
          return <div ref={actionElRef} style={unref(getActionStyleRef)} class={cls}>
            {isPassing ? <CheckOutlined class='drag-verify-action__icon' /> : <DoubleRightOutlined class='drag-verify-action__icon' />} 
          </div>
        }

        return <div 
          ref={wrapElRef}
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
    text-align: center;

    &-bar {
      position: absolute;
      width: 0;
      background: @success-color;
      border-radius: @radius;
    }

    &-content {
      animation: slidetounlock 3s infinite;
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