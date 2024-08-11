<script lang='tsx'>
  import { defineComponent, PropType, reactive } from "vue";
  import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons-vue'
  interface ImageState {
    currentUrl: string;
    show: boolean;
    currentIndex: number;
  }

  const props = {
    show: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    imageList: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    index: {
      type: Number as PropType<number>,
      default: 0
    },
    maskClosable: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  }
  const prefixCls = 'img-preview'
  export default defineComponent({
    props,
    setup(props) {
      const imgState = reactive<ImageState>({
        currentUrl: '',
        show: false,
        currentIndex: 0
      })

      const renderClose = () => {
        return (
          <div class={`${prefixCls}__close`}>
            <CloseOutlined class={`${prefixCls}__close-icon`}/>
          </div>
        )
      }

      const renderIndex = () => {
        const { currentIndex } = imgState
        const { imageList } = props
        return (
          <div class={`${prefixCls}__index`}>
            { currentIndex + 1 } / { imageList.length }
          </div>
        )
      }

      const renderController = () => {
        return (
          <div class={`${prefixCls}__controller`}>
            <div class={`${prefixCls}__controller-item`}>

            </div>
          </div>
        )
      }

      const renderArrow = (direction: 'left' | 'right') => {
        return <div class={[`${prefixCls}__arrow`]}>
          { direction === 'left' ? <LeftOutlined /> : <RightOutlined /> }
        </div> 
      }

      return () => {
        return imgState.show && (<div class={prefixCls}>
          <div class={`${prefixCls}-content`}>
            <img class={`${prefixCls}-image`} src='' />
            { renderClose() }
            { renderIndex() }
            { renderController() }
            { renderArrow('left') }
            { renderArrow('right') }
          </div>
        </div>)
      }
    } 
  })
</script>
  
<style lang='less'>
  .img-preview {
    &__close {

    }
  }
</style>