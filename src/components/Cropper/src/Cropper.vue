<template>
  <div :class="getClass" :style="getWrapperStyle">
    <img 
      v-show="isReady"
      ref="imgElRef"
      :src="src" 
      :alt="alt"
      :style="getImageStyle" />
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, CSSProperties, onMounted, onUnmounted, PropType, ref, unref } from 'vue';
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'
  import { propTypes } from '@/utils/propTypes';
  import { useDesign } from '@h/web/useDesign'
  import { useDebounceFn } from '@vueuse/core';
  
  defineOptions({ name: 'CropperImage' })
  const { prefixCls } = useDesign('cropper-image')

  type Options = Cropper.Options;

  const defaultOptions: Options = {
    aspectRatio: 1,
    zoomable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true,
    autoCrop: true,
    background: true,
    highlight: true,
    center: true,
    responsive: true,
    restore: true,
    checkCrossOrigin: true,
    checkOrientation: true,
    scalable: true,
    modal: true,
    guides: true,
    movable: true,
    rotatable: true,
  };

  const props = defineProps({
    src: {
      type: String,
      default: '',
      required: true
    },
    alt: propTypes.string.def(''),
    realTimePreview: propTypes.bool.def(true),
    imageStyle: {
      type: Object as PropType<CSSProperties>,
      default: {},
    },
    height: {
      type: [ String, Number ],
      default: '360px'
    },
    circled: {
      type: Boolean,
      default: false
    },
    
  })

  const emits = defineEmits(['cropped', 'ready', 'croppedError'])
  const isReady = ref(false)
  const imgElRef = ref<Nullable<HTMLImageElement>>(null)
  const cropper = ref<Nullable<Cropper>>(null)

  const debounceRealTimePreview = useDebounceFn(realTimeCroppered, 60)

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--circled`]: props.circled
      }
    ]
  })

  const getWrapperStyle = computed((): CSSProperties => {
    return { height: `${props.height}`.replace(/px/, '') + 'px' }
  })

  const getImageStyle = computed((): CSSProperties => {
    return {
      height: props.height,
      maxWidth: '100%',
    }
  })

  function croppered() {
    if ( !cropper.value ) return
    const imgInfo = cropper.value.getData()
    const canvas = props.circled ? getRoundedCanvas() : cropper.value.getCroppedCanvas();

    canvas.toBlob(blob => {
      if ( !blob ) return
      const fileReader = new FileReader()
      fileReader.readAsDataURL(blob)

      fileReader.onloadend = e => {
        const { result } = e.target
        emits('cropped', {
          imgbase64: result || '',
          imgInfo
        })
      }

      fileReader.onerror = e => {
        emits('croppedError', e)
      }
    }, 'image/png')
  }

  function realTimeCroppered() {
    props.realTimePreview && croppered()
  }

  function getRoundedCanvas() {
    const sourceCanvas = cropper.value.getCroppedCanvas()
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    context.drawImage(sourceCanvas, 0, 0, width, height)
    // 目标在内部
    context.globalCompositeOperation = 'destination-in';
    context.beginPath()
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
    context.fill()

    return canvas
  }

  const init = () => {
    
    const imgEl = unref(imgElRef)
    if ( !imgEl ) return

    cropper.value = new Cropper(imgEl, {
      ...defaultOptions,
      ready: () => {
        isReady.value = true
        realTimeCroppered()
        emits('ready', cropper.value)
      },

      crop: () => {
        debounceRealTimePreview()
      },

      zoom: () => {
        debounceRealTimePreview()
      },

      cropmove: () => {
        debounceRealTimePreview()
      }
    })

  }

  onMounted(init)

  onUnmounted(() => {
    cropper.value?.destroy()
  })
</script>
  
<style lang='less'>
  @prefixCls: ~'@{namespace}-cropper-image';

  .@{prefixCls} {
    &--circled {
      .cropper-view-box,
      .cropper-face {
        border-radius: 50%;
      }
    }
  }
</style>