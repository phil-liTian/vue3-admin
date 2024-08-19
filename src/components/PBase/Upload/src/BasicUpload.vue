<template>
  <div>
    <Space>
      <PButton type='primary' @click="openUploadModal" preIcon="material-symbols:cloud-upload">
        {{ t('upload') }}
      </PButton>

      <Tooltip placement="bottom">
        <PButton @click="openUploadPreviewModal">
          <PIcon icon="ph:eye"></PIcon>
        </PButton>
      </Tooltip>
    </Space>

    <UploadModal 
      @register="registerUploadModal" />

    <UploadPreviewModal 
      @register="registerUploadPreviewModal" />
  </div>
</template>
  
<script lang='ts' setup>
  import { Space, Tooltip } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useModal } from '@c/PBase/Modal/index'
  import UploadModal from './components/UploadModal.vue';
  import UploadPreviewModal from './components/UploadPreviewModal.vue';
  defineOptions({ name: 'PBasicUpload' })
  const { t } = useI18n('component.upload')

  // 上传modal
  const [ registerUploadModal, { openModal: openUploadModal } ] = useModal()

  // 查看上传文件modal
  const [ registerUploadPreviewModal, { openModal: openUploadPreviewModal } ] = useModal()
</script>
  
<style lang='less' scoped>
  
</style>