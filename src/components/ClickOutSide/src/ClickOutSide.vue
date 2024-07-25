<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>
  
<script lang='ts' setup>
  import { onClickOutside } from "@vueuse/core";
  import { onMounted, ref } from "vue";

  const emits = defineEmits(['mounted', 'clickOutside'])
  const wrap = ref(null);

  onClickOutside(wrap, () => {
    emits('clickOutside')
  });

  onMounted(() => {
    emits('mounted')
  })

</script>
  
<style lang='less' scoped>
  
</style>