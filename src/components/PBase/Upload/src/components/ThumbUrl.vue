<template>
  <span>
    <Image :src="fileUrl" :width="100" />
  </span>
</template>
  
<script lang='ts' setup>
  import { Image } from 'ant-design-vue'
  const props = defineProps({
    fileUrl: String
  })
</script>
  
<style lang='less' scoped>
  
</style>