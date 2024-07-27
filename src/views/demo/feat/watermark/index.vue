<!--
 * @Date: 2024-07-27 11:01:42
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="水印示例">
    <PCollapseContainer title="Global Watermark">
      <PButton type="primary" class="mr-2" @click="setWatermark('Watermark info1')">Create Watermark1</PButton>
      <PButton type="primary" class="mr-2" @click="setWatermark2('Watermark info2')">Create Watermark2</PButton>
      <PButton color="error" class="mr-2" @click="clear">Clear Watermark1</PButton>
      <PButton color="error" class="mr-2" @click="clearAll"> ClearAll </PButton>
      <PButton color="warning" @click="setWatermark('update watermarkNew')">Update Watermark1</PButton>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useWatermark } from '@h/web/useWatermark'
  const { setWatermark, clear, clearAll } = useWatermark()
  const { setWatermark: setWatermark2 } = useWatermark()
</script>
  
<style lang='less' scoped>
  
</style>