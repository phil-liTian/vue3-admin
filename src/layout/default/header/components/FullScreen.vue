<!--
 * @Date: 2024-03-27 21:32:48
 * @LastEditors: phil_litian
-->
<template>
  <Tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { useFullscreen } from '@vueuse/core'
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
  import { useI18n } from '@h/web/useI18n'
  defineOptions({ name: 'FullScreen' })
  const { t } = useI18n('layout')
  const { isFullscreen, toggle } = useFullscreen()

  const getTitle = computed(() => {
    return isFullscreen.value ? t('header.tooltipExitFull') : t('header.tooltipEntryFull')
  })
</script>
  
<style lang='less' scoped>
  
</style>