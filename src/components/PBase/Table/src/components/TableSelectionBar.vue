<!--
 * @Date: 2024-05-07 17:36:44
 * @LastEditors: phil_litian
-->
<template>
  <Alert type="info">
    <template #message>
      <span>{{ t('table.selectionBarEmpty') }}</span>
    </template>
  </Alert>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('component')
</script>
  
<style lang='less' scoped>
  
</style>