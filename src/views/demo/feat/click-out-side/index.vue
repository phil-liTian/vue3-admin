<!--
 * @Date: 2024-07-23 10:46:13
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="点击外部触发事件">
    <ClickOutSide @click-outside="handleClickOutSide">
      <div class="flex items-center justify-center h-300px w-full bg-blue-500 text-24px" @click="innerClick">{{ text }}</div>
    </ClickOutSide>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ClickOutSide } from '@c/ClickOutSide/index'
  import { ref } from 'vue';
  const text = ref('click');

  function handleClickOutSide() {
    text.value = 'click out side';
  }

  function innerClick() {
    text.value = 'click inner';
  }
</script>
  
<style lang='less' scoped>
  
</style>