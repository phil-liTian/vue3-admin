<template>
  <transition name="fade-bottom" mode="out-in">
    <LockPage v-if="getIsLock" />
  </transition>
</template>
  
<script lang='ts' setup>
  import { useLockStore } from '@s/modules/lock'
  import { computed } from 'vue';
  import LockPage from './LockPage.vue';

  const lockStore = useLockStore()
  // 不能解构处理 会失去响应式
  // const { getLockInfo }  = useLockStore()

  const getIsLock = computed(() => lockStore?.getLockInfo?.isLock ?? false)
</script>
  
<style lang='less' scoped>
  
</style>