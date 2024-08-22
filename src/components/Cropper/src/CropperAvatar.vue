<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style='getImageWrapperStyle' @click="openModal" >
      <div :class="`${prefixCls}-image-mask`" :style='getImageWrapperStyle'>
        <PIcon 
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
          icon="ant-design:cloud-upload-outlined" />
      </div>
      <img v-if='sourceValue' :src="sourceValue" alt="">
    </div>
    
    <PButton 
      :class="`${prefixCls}-upload-btn`"
      v-if="showBtn" 
      type='primary'
      @click="openModal">
      选择图片
    </PButton>

    <CropperModal 
      :uploadApi="uploadApi"
      @register="register"
      @uploadSuccess='handleUploadSuccess' />
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, CSSProperties, ref, unref } from 'vue';
  import CropperModal from './CropperModal.vue';
  import { useModal } from '@c/PBase/Modal/index'
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@/utils/propTypes';
  const props = defineProps({
    width: propTypes.oneOfType([String, Number]).def('200px'),
    showBtn: propTypes.bool.def(true),
    value: propTypes.string.def(''),
    uploadApi: {
      type: Function as PropType<({ file, name }: { file: Blob; name: string }) => Promise<void>>,
    },
  })
  const emits = defineEmits(['change'])
  const [ register, { openModal } ] = useModal()
  const { prefixCls } = useDesign('cropper-avatar')
  const sourceValue = ref(props.value || '')
  const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px')
  const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2)

  const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }))
  const getImageWrapperStyle = computed((): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }))
  const getClass = computed(() => {
    return [ prefixCls ]
  })

  const handleUploadSuccess = ({ source, data }) => {
    sourceValue.value = source
    emits('change', { source, data });
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      border: 1px solid @border-color-base;
      border-radius: 50%;
      background-color: @component-background;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      position: absolute;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      opacity: 0;
      transition: opacity .4s;
      background: rgb(0 0 0 / 40%);
      cursor: pointer;

      :deep(svg) {
        margin: auto;
      }

      &:hover {
        opacity: 1;
      }
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>