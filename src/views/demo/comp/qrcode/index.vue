<!--
 * @Date: 2024-04-25 09:52:22
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="二维码组件示例">
    <div class="flex">
      <PCollapseContainer class="w-1/5" title="基础示例">
        <QrCode :value="qrCodeUrl" />
      </PCollapseContainer>

      <PCollapseContainer class="w-1/5" title="渲染成img标签">
        <QrCode :value="qrCodeUrl" tag="img" />
      </PCollapseContainer>
      
      <PCollapseContainer title="带logo示例">
        <QrCode :value="qrCodeUrl" :logo="PhilImg" />
      </PCollapseContainer>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { QrCode } from '@c/Qrcode/index'
  import PhilImg from '@/assets/images/phil.png'
  const qrCodeUrl = 'https://github.com/phil-liTian/vue3-admin'
</script>
  
<style lang='less' scoped>
  
</style>