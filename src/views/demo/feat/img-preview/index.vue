<template>
  <PageWrapper title="">
    <image-preview :imageList="imgList"></image-preview>
    <PButton @click="openImg">无预览图</PButton>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ImagePreview, createImgPreview } from '@c/Preview/index'

  const imgList = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ]


  const openImg = () => {
    createImgPreview({  })
  }
</script>
  
<style lang='less' scoped>
  
</style>