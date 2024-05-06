<!--
 * @Date: 2024-05-06 11:15:38
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { computed, defineComponent, reactive, unref, ref } from "vue";
  import { useI18n } from '@h/web/useI18n'
  import { rotateProps } from './props'
  import { MoveData, DragVerifyActionType } from './typing'
  import BasicDragVerify from "./DragVerify.vue";
  import { hackCss } from "@/utils/domUtils";

  export default defineComponent({
    name: 'ImgRotateDragVerify',
    props: rotateProps,
    setup(props, { attrs, expose }) {
      const { t } = useI18n('component')
      const basicRef = ref<Nullable<DragVerifyActionType>>(null)
      const state = reactive({
        imgStyle: {},
        randomRotate: 0, // 默认随机的旋转角度
        currentRotate: 0, // 当前的旋转角度
        draged: false, // 拖拽是否结束
        showTip: false, // 是否展示提示语
        isPassing: false, // 是否校验成功
        startTime: 0,
        endTime: 0
      })

      function handleImgOnLoad() {
        const { minDegree, maxDegree } = props
        const ranDegree = Math.floor(minDegree + Math.random() * (maxDegree - minDegree))
        state.randomRotate = ranDegree
        state.imgStyle = hackCss('transform', `rotateZ(${ranDegree}deg)`)
      }

      const getFactoryRef = computed(() => {
        return 1
      })

      function handleDragStart() {
        state.startTime = Date.now()
      }

      function handleDragMove(data: MoveData) {
        state.draged = true
        const { imgWidth, maxDegree, height } = props
        const { moveX } = data
        const currentRotate = Math.ceil((moveX / (imgWidth - parseInt(height as string))) * maxDegree)
        state.currentRotate = currentRotate
        state.imgStyle = hackCss('transform', `rotateZ(${state.randomRotate - currentRotate}deg)`)
      }

      function handleDragEnd() {
        const { diffDegree } = props
        const { randomRotate, currentRotate } = state
        if ( Math.abs(randomRotate - currentRotate) >= diffDegree ) {
          // 没有拖到正确位置 还原
          state.imgStyle = hackCss('transform', `rotateZ(${randomRotate}deg)`)
        } else {
          checkPass()
        }

        state.showTip = true
      }

      function checkPass() {
        state.isPassing = true
        state.endTime = Date.now()
      }

      function resume() {
        const basicEl = unref(basicRef)
        if ( !basicEl ) return
        basicEl.resume()
        state.isPassing = false
        handleImgOnLoad()
      }

      const getImgWrapStyleRef = computed(() => {
        const { imgWidth, imgWrapStyle } = props
        return {
          width: `${imgWidth}px`,
          height: `${imgWidth}px`,
          ...imgWrapStyle
        }
      })

      expose({ resume })

      return () => {
        const { src } = props
        const { isPassing } = state
        /** 注意当前属性位置 防止value被默认属性覆盖 */

        return (
          <div class='ir-dv'>
            <div class='ir-dv-img__wrap' style={unref(getImgWrapStyleRef)}>
              <img 
                src={src} 
                alt="verify"
                width={parseInt(props.width as string)}
                style = { state.imgStyle }
                onLoad={handleImgOnLoad}
                onClick={resume}
              />
              {
                state.showTip && <span class={['ir-dv-img__tip', state.isPassing ? 'success' : 'error']}>
                  {
                    state.isPassing ? t('verify.time', { time: 1 }) : t('verify.error')
                  }
                </span>
              }
              {
                !state.showTip && <span class={['ir-dv-img__tip', 'normal']}>{ t('verify.redoTip') }</span>
              }
            </div>
            <BasicDragVerify 
              class='ir-dv-drag__bar'
              onStart={handleDragStart}
              onMove={handleDragMove}
              onEnd={handleDragEnd}
              ref={basicRef}
              {...{ ...attrs, ...props }}
              value={isPassing} />
          </div>
        )
      }
    }
  })
</script>
  
<style lang='less' scoped>
  .ir-dv {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-img__wrap {
      position: relative;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }

    &-img__tip {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: @white;
      font-size: 12px;

      &.success {
        background-color: fade(@success-color, 60%);
      }

      &.error {
        background-color: fade(@error-color, 60%);
      }

      &.normal {
        background-color: rgba(0, 0, 0, .3);
      }
    }

    &-drag__bar {
      margin-top: 20px;
    }
  }
</style>