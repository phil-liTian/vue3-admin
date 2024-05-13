<!--
 * @Date: 2024-05-07 17:36:44
 * @LastEditors: phil_litian
-->
<template>
  <Alert type="info">
    <template #message>
      <span v-if="!props.count">{{ t('table.selectionBarEmpty') }}</span>
      <span v-else>{{ t('table.selectionBarTips', { count: props.count }) }}</span>
    </template>
  </Alert>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { propTypes } from '@/utils/propTypes';
  const { t } = useI18n('component')
  const props = defineProps({
    count: propTypes.number.def(0)
  })
</script>
  
<style lang='less' scoped>
  
</style>