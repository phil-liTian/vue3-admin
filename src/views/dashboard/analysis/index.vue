<!--
 * @Date: 2024-03-03 11:26:59
 * @LastEditors: phil_litian
-->
<template>
  <!-- <div class="p-4">
    
    <GrowCard :loading="loading" />
  </div> -->
  <page-wrapper>11</page-wrapper>

</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import GrowCard from './components/GrowCard.vue'
  const loading = ref(true)  

  setTimeout(() => {
    loading.value = false
  }, 500);
</script>
  
<style lang='less' scoped>
  
</style>