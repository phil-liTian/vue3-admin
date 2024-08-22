<template>
  <PageWrapper title="密码强度">
    <div class="flex justify-center">
      <div class="demo-wrap p-10">
        <StrengthMeter />

        <StrengthMeter placeholder="禁用" disabled />
        <br />

        <StrengthMeter placeholder="隐藏input" value='#21~asda09po' :show-input="false" />
      </div>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { StrengthMeter } from '@c/StrengthMeter/index'
</script>
  
<style lang='less' scoped>
  .demo-wrap {
    width: 50%;
    border-radius: 10px;
    background-color: @component-background;
  }
</style>