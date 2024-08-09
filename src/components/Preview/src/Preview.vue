<template>
  <div :class="prefixCls">
    <preview-group>
      <slot v-if="!imageList || $slots.default"></slot>
      <template v-else>
        <template v-for="item in getImageList" :key="item.src">
          <Image :src="item.placeholder"></Image>
        </template>
      </template>
    </preview-group>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from 'vue'
  import { Image } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { isString } from '@/utils/is'

  const { prefixCls } = useDesign('image-preview')
  type ImageProps = {
    alt?: string,
    src: string,
    placeholder?: string,
    width: string | number,
    height?: string | number,
  }

  type ImageItem = string | ImageProps
  const PreviewGroup = Image.PreviewGroup
  const props = defineProps({
    imageList: {
      type: Array as PropType<ImageItem[]>,
    }
  })

  const getImageList = computed((): any[] => {
    const { imageList } = props
    if ( !imageList ) {
      return []
    }

    return imageList.map(item => {
      if ( isString(item) ) {
        return {
          src: item,
          placeholder: false
        }
      }
      return item
    })
  })
</script>
  
<style lang='less' scoped>
  
</style>