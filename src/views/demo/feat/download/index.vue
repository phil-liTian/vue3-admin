<template>
  <PageWrapper title="文件下载">

    <Alert message="根据后台接口文件流下载" />
    <PButton type="primary" class="my-4" @click="handleDownByData"> 文件流下载 </PButton>

    <Alert message="根据文件地址下载文件" />
    <PButton type="primary" class="my-4" @click="handleDownloadByUrl"> 文件地址下载 </PButton>

    <!-- <Alert message="base64流下载" /> -->
    <!-- <PButton type="primary" class="my-4" @click="handleDownloadByBase64"> base64下载 </PButton> -->

    <Alert message="图片Url下载,如果有跨域问题，需要处理图片跨域" />
    <PButton type="primary" class="my-4" @click="handleDownloadByOnlineUrl"> 图片Url下载 </PButton>

  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue'
  // import imgBase64 from './base64';
  import { downloadByUrl, downloadByData, downloadByBase64, downloadByOnlineUrl } from '@u/file/download'
  const handleDownByData = () => {
    downloadByData('phil admin', 'test.txt')
  }

  const handleDownloadByUrl = () => {
    downloadByUrl({ url: 'https://static.bokao2o.com/a374134e-d684-487d-8772-e8c4ba516005.png' })
  }

  // const handleDownloadByBase64 = () => {
  //   downloadByBase64(imgBase64, 'test.png')
  // }

  const handleDownloadByOnlineUrl = () => {
    downloadByOnlineUrl('https://static.bokao2o.com/a374134e-d684-487d-8772-e8c4ba516005.png', 'text.png')
  }
</script>
  
<style lang='less' scoped>
  
</style>