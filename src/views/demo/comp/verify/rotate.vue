<!--
 * @Date: 2024-05-06 14:48:38
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="旋转校验示例">
    <div class="flex p-4 bg-gray-700 items-center justify-center">
      <RotateDragVerify :src="imgSrc" />
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { RotateDragVerify } from '@c/Verify/index'
  import imgSrc from '@/assets/images/header.jpg'
</script>
  
<style lang='less' scoped>
  
</style>