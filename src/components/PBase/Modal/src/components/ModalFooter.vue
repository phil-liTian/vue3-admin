<!--
 * @Date: 2024-04-16 20:45:47
 * @LastEditors: phil_litian
-->
<template>
  <div>
    <slot name="insertFooter"></slot>
    <PButton 
      v-bind="cancelButtonProps"
      v-if="showCancelBtn"
      @click="handleCancel">
      {{ cancelText || t('common.cancelText') }}
    </PButton>

    <slot name="centerFooter"></slot>
    <PButton 
      v-if="showOkBtn"
      v-bind="okButtonProps"
      :type="onType"
      :loading="confirmLoading"
      @click="handleOk">
      {{ okText || t('common.okText') }}
    </PButton>
    <slot name="appendFooter"></slot>
  </div>
</template>
  
<script lang='ts' setup>
  import { useI18n } from '@h/web/useI18n'
  import { basicProps } from '../props'
  defineProps(basicProps)
  const emits = defineEmits(['cancel', 'ok'])

  const { t } = useI18n()

  const handleCancel = () => {
    emits('cancel')
  }

  const handleOk = () => {
    emits('ok')
  }
</script>
  
<style lang='less' scoped>
  
</style>