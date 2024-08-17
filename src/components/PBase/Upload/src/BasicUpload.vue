<template>
  <div>
    <Space>
      <PButton type='primary' @click="openUploadModal" preIcon="material-symbols:cloud-upload">
        {{ t('upload') }}
      </PButton>
    </Space>

    <UploadModal 
      @register="registerUploadModal" />

    <UploadPreviewModal 
      @register="registerUploadPreviewModal" />
  </div>
</template>
  
<script lang='ts' setup>
  import { Space } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useModal } from '@c/PBase/Modal/index'
  import UploadModal from './components/UploadModal.vue';
  import UploadPreviewModal from './components/UploadPreviewModal.vue';
  const { t } = useI18n('component.upload')

  const [ registerUploadModal, { openModal: openUploadModal } ] = useModal()

  const [ registerUploadPreviewModal, { openModal: openUploadPreviewModal } ] = useModal()
</script>
  
<style lang='less' scoped>
  
</style>