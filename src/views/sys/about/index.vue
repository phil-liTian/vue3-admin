<!--
 * @Date: 2024-03-20 21:16:55
 * @LastEditors: phil_litian
-->
<template>
  <pageWrapper title="关于">
    <template #headerContent>

    </template>

    <PDescription @register="infoRegister" />
  </pageWrapper>
</template>
  
<script lang='ts' setup>
  import { useDescription } from '@c/PBase/Description/src/useDescription'

  const [ infoRegister ] = useDescription()
</script>
  
<style lang='less' scoped>
  
</style>