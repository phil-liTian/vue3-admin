<!--
 * @Date: 2024-07-27 16:20:42
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="Ripple示例">
    <!-- ripple-background="purple" -->
    <div 
      v-ripple:as
      class="flex items-center justify-center bg-blue-500 w-75 h-75 text-24px text-white"> content 
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import RippleDirective from '@/directives/ripple';

  const vRipple = RippleDirective
</script>
  
<style lang='less' scoped>
  
</style>