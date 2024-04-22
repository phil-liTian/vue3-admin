<!--
 * @Date: 2024-04-21 10:20:56
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="滚动组件示例">
    <div class="scroll-wrap">
      <PScrollContainer class="mt-4">
        <ul class="p-3">
          <template v-for="index in 100" :key="index">
            <li class="p-2" :style="{ border: '1px solid #eee' }">{{ index }}</li>
          </template>
        </ul>
      </PScrollContainer>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  
</script>
  
<style lang='less' scoped>
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background-color: @component-background;
  }
</style>