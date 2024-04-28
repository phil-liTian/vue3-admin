<!--
 * @Date: 2024-04-26 11:27:31
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="时间组件">
    <PCollapseContainer :loading="loading" title="基础">
      <Time :value="state.time1" />
      <br />
      <Time :value="state.time2" />
      <br />
      <Time :value="state.time3" />
    </PCollapseContainer>

    <PCollapseContainer title="定时更新" class="my-4">
      <template #title>测试自定义title-定时更新</template>
      <Time :value="now" :step="1" />
      <Time :value="now" :step="5" />
    </PCollapseContainer>

    <PCollapseContainer title="时间格式处理">
      <Time :value="now" mode="date" />
      <Time :value="now" mode="dateTime" />
    </PCollapseContainer>

  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { reactive } from 'vue'
  import { Time } from '@c/Time/index'
  import { ref } from 'vue';
  const now = Date.now()
  const loading = ref(true)
  setTimeout(() => {
    loading.value = false
  }, 1000);
  const state = reactive({
    time1: now + 3 * 1000,
    time2: now + 3 * 60 * 1000,
    time3: now + 3 * 60 * 60 * 1000,
  })
</script>
  
<style lang='less' scoped>
  
</style>