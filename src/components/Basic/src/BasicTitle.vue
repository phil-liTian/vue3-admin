<!--
 * @Date: 2024-03-28 17:27:00
 * @LastEditors: phil_litian
-->
<template>
  <span :class="getClass">
    <slot></slot>
    <basic-help v-if="helpMessage" :text="helpMessage"></basic-help>
  </span>
</template>
  
<script lang='ts' setup>
  import { computed, PropType } from "vue"
  import { useDesign } from '@h/web/useDesign'
  import BasicHelp from "./BasicHelp.vue";
  const { prefixCls } = useDesign('basic-title')

  defineOptions({ name: 'PBasicTitle' })
  defineProps({
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    }
  })

  const getClass = computed(() => {
    return [
      prefixCls
    ]
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {

  }
</style>