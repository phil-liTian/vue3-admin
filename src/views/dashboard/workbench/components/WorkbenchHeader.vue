<!--
 * @Date: 2024-03-22 16:20:33
 * @LastEditors: phil_litian
-->
<template>
  <div>{{ userInfo }}</div>
</template>
  
<script lang='ts' setup>
import { useUserStore } from '@s/modules/user'
import { computed } from 'vue'


const useUser = useUserStore()
const userInfo = computed(() => useUser.getUserInfo)
</script>
  
<style lang='less' scoped>
  
</style>