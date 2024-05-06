<!--
 * @Date: 2024-04-25 09:56:54
 * @LastEditors: phil_litian
-->
<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>
  
<script lang='ts' setup>
  import { onMounted, PropType, ref, unref } from "vue";
  import { propTypes } from "@/utils/propTypes";
  import { toDataURL } from 'qrcode'
  import { toCanvas } from './toCanvas'
  import { LogoType, QrcodeDoneEventParams } from "./typing";

  defineOptions({ name: 'QrCode' });
  const props = defineProps({
    value: {
      // propTypes.oneOfType([propTypes.string, propTypes.array])
      type: [String, Array] as PropType<string | string[]>,
      default: null
    },  
    width: propTypes.number.def(200),
    tag: {
      type:  String as PropType<'canvas' | 'img'>,
      default: 'canvas',
      validator: (val: string) => ['canvas', 'img'].includes(val)
    },
    options: {
      type: Object,
      default: {}
    },
    logo: {
      type: [String, Object] as PropType<Partial<LogoType> | string>,
      default: ''
    }
  })

  const emits = defineEmits({
    done: (data: QrcodeDoneEventParams) => !!data,
    error: (err: any) => !!err
  })

  const wrapRef = ref<Nullable<HTMLCanvasElement | HTMLImageElement>>(null)

  async function createQrcode() {
    try {
      const { tag, width, options = {}, value, logo } = props
      const renderValue = String(value)
      const wrapEl = unref(wrapRef)
      if ( !wrapEl ) return
      if ( tag === 'canvas' ) {
        const url = await toCanvas({
          canvas: wrapEl,
          width,
          content: renderValue,
          options,
          logo
        })
        console.log('url', url);
        
      } else if ( tag === 'img' ) {
        let url = await toDataURL(renderValue, {
          errorCorrectionLevel: 'H',
          width,
          ...options
        });

        (unref(wrapEl) as HTMLImageElement).src = url;
        emits('done', { url })
      }
    } catch(error) {
      emits('error', error)
    }
  }

  onMounted(createQrcode)
  
</script>
  
<style lang='less' scoped>
  
</style>