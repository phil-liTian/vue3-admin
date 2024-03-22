<!--
 * @Date: 2024-03-03 10:30:50
 * @LastEditors: phil_litian
-->
<template>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- mode: out-in: 当前元素先过渡离开，新元素在过渡（多数情况下使用这个）  in-out: 新元素先进行过渡, 然后当前元素过渡离开 -->
      <!-- appear: 元素在初次渲染时是否有动画 -->
      <transition
        :name="getTransitionName()"
        mode="out-in"
        appear>
        <component :is="Component" :key="route.fullPath"></component>
      </transition>
    </template>
  </RouterView>
</template>
  
<script lang='ts' setup>
import { getTransitionName } from './transition'
</script>
  
<style lang='less' scoped>
 
</style>