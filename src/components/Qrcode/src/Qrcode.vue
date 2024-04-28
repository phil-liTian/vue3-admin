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

  defineOptions({ name: 'QrCode' });
  const props = defineProps({
    width: propTypes.number.def(200),
    tag: {
      type:  String as PropType<'canvas' | 'img'>,
      default: 'canvas',
      validator: (val: string) => ['canvas', 'img'].includes(val)
    }
  })

  const wrapRef = ref<Nullable<HTMLCanvasElement | HTMLImageElement>>(null)

  function createQrcode() {
    try {
      const wrapEl = unref(wrapRef)
      if ( !wrapEl ) return
      
      
    } catch(error) {
      console.log('error', error);
    }
  }

  onMounted(createQrcode)
  
</script>
  
<style lang='less' scoped>
  
</style>