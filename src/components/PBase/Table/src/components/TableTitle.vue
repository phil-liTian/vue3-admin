<!--
 * @Date: 2024-05-07 16:49:04
 * @LastEditors: phil_litian
-->
<template>
  <PBasicTitle v-if="getTitle" :class="prefixCls" :helpMessage="helpMessage">
    {{ getTitle }}
  </PBasicTitle>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, PropType } from 'vue'
  const props = defineProps({
    title: {
      type: [String, Function] as PropType<string | ((data) => string)>
    },
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>
    }
  })
  const { prefixCls } = useDesign('basic-table-title')

  const getTitle = computed(() => {
    const tit = props.title


    return tit
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-basic-table-title';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>