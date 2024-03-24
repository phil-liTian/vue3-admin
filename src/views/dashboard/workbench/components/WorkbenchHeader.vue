<!--
 * @Date: 2024-03-22 16:20:33
 * @LastEditors: phil_litian
-->
<template>
  <div class="flex">
    <Avatar :size="72" :src="avatar"></Avatar>  
    <div class="flex flex-col mt-2 ml-6">
      <h1>早安，{{ userInfo.username }}, 开始你一天的工作吧</h1>
      <span>今天晴朗, 温度15～23摄氏度</span>
    </div>

    <div class="flex-1 flex justify-end">
      <div class="flex flex-col mr-4">
        <span class="text-secondary"> 待办 </span>
        <span class="text-2xl">2/10</span>
      </div>
      <div class="flex flex-col mr-4 md:mx-16">
        <span class="text-secondary"> 项目 </span>
        <span class="text-2xl">8</span>
      </div>
      <div class="flex flex-col">
        <span class="text-secondary"> 团队 </span>
        <span class="text-2xl">300</span>
      </div>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
import { computed } from 'vue'
import { Avatar } from 'ant-design-vue'
import { useUserStore } from '@s/modules/user'
import avatar from '@/assets/images/phil.png'


const useUser = useUserStore()
const userInfo = computed(() => useUser.getUserInfo)
console.log('userInfo', userInfo);

</script>
  
<style lang='less' scoped>
  
</style>