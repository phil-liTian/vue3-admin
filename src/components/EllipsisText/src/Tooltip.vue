<template>
  <div class="m-tooltip">
    <div class="m-tooltip-content">

    </div>

    <div>
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref } from "vue";

  interface Props {
    content?: string; // 展示的文本 string | slot
    tooltip?: string; // 提示的文本
    fontSize?: number;
    color?: string;
    maxWidth?: number;
    backgroundColor?: string;
  }

  withDefaults(defineProps<Props>(), {
    maxWidth: 120,
    content: '暂无内容',
    tooltip: '暂无提示',
    color: "#fff",
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, .85)',
  })

  const visible = ref(false)

</script>
  
<style lang='less' scoped>
  
</style>