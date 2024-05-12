<!--
 * @Date: 2024-05-07 11:31:55
 * @LastEditors: phil_litian
-->
<template>
  <Tooltip>
    <template #title>
      <span>{{ t('table.settingFullScreen') }}</span>
    </template>
    <FullscreenOutlined />
  </Tooltip>
</template>
  
<script lang='ts' setup>
  import { Tooltip } from 'ant-design-vue'
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('component')
</script>
  
<style lang='less' scoped>
  
</style>