<template>
  <PBasicModal>
    <template #centerFooter>
      <PButton
        :loading="isUploadingRef">
        {{ getUploadButtonTxt }}
      </PButton>
    </template>

    <div>
      <Upload>
        <PButton type="primary">{{ t('choose') }}</PButton>
      </Upload>
    </div>

  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Upload } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'

  const { t } = useI18n('component.upload')
  const isUploadingRef = ref(false)
  const fileListRef = ref<[]>([])

  const getUploadButtonTxt = computed(() => {
    return isUploadingRef.value ? t('uploading') : t('startUpload')
  })
</script>
  
<style lang='less' scoped>
  
</style>