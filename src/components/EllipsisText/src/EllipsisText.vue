<template>
  <Tooltip v-if="showTooltip">
    
  </Tooltip>

  <div v-else>
    <slot></slot>    
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import Tooltip from './Tooltip.vue';
  interface Props {
    tooltip?: boolean; // 是否开启点击文本展示全部
  }

  const props = withDefaults(defineProps<Props>(), {
    tooltip: true
  })
  
  const showTooltip = computed(() => {
    return props.tooltip
  })

  
</script>
  
<style lang='less' scoped>
  
</style>