<!--
 * @Date: 2024-05-07 11:29:32
 * @LastEditors: phil_litian
-->
<template>
  <Tooltip>
    <template #title>
      <span>{{ t('common.redo') }}</span>
    </template>
    <RedoOutlined />
  </Tooltip>
</template>
  
<script lang='ts' setup>
  import { Tooltip } from 'ant-design-vue'
  import { RedoOutlined } from '@ant-design/icons-vue'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n()
</script>
  
<style lang='less' scoped>
  
</style>