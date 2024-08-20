<template>
  <div>
    <Space>
      <PButton type='primary' @click="openUploadModal" preIcon="material-symbols:cloud-upload">
        {{ t('upload') }}
      </PButton>

      <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('uploaded') }}
          <template v-if="fileList.length">{{ fileList.length }}</template>
        </template>
        <PButton v-if="showPreview" @click="openUploadPreviewModal">
          <PIcon icon="ph:eye" />
          <template v-if="fileList.length">{{ fileList.length }}</template>
        </PButton>
      </Tooltip>
    </Space>

    <!-- 上传 -->
    <UploadModal 
      v-bind='bindValue'
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange" />

    <!-- 预览 -->
    <UploadPreviewModal 
      :value="fileList"
      @register="registerUploadPreviewModal"
      @delete="handlePreviewDelete" />
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue'
  import { Space, Tooltip } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useModal } from '@c/PBase/Modal/index'
  import UploadModal from './components/UploadModal.vue';
  import UploadPreviewModal from './components/UploadPreviewModal.vue';
  import { uploadContainerProps } from './props';

  defineOptions({ name: 'PBasicUpload' })
  const emits = defineEmits(['change', 'preview-delete'])
  const props = defineProps({
    ...uploadContainerProps
  })
  const fileList = ref([])
  const { t } = useI18n('component.upload')

  // 上传modal
  const [ registerUploadModal, { openModal: openUploadModal } ] = useModal()

  // 查看上传文件modal
  const [ registerUploadPreviewModal, { openModal: openUploadPreviewModal } ] = useModal()

  const bindValue = computed(() => {
    return { ...props }
  })

  const showPreview = computed(() => {
    const { emptyHidePreview } = props
    if ( !emptyHidePreview ) return true
    return fileList.value.length > 0
  })

  function handleChange(list) {
    fileList.value = [...fileList.value, ...list]
    emits('change', list)
  }

  const handlePreviewDelete = (url: string) => {
    emits('preview-delete', url)
  }
</script>
  
<style lang='less' scoped>
  
</style>