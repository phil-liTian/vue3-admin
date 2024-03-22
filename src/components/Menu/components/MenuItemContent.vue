<!--
 * @Date: 2024-03-03 14:40:59
 * @LastEditors: phil_litian
-->
<template>
  <span>
    {{ getI18nName }}
  </span>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { useI18n } from '@h/web/useI18n'
  import { contentProps } from '../props'
  const { t } = useI18n()
  const getI18nName = computed(() => t(props.item.name))

  const props = defineProps(contentProps)
</script>
  
<style lang='less' scoped>
  
</style>