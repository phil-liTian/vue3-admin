<template>
  <PBasicModal
    :title="t('upload')"
    @ok="handleOk"
    @register="register"
    class='upload-modal'
    width='800px'>
    <template #centerFooter>
      <PButton
        color="success"
        @click="handleStartUpload"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef">
        {{ getUploadButtonTxt }}
      </PButton>
    </template>

    <div class='upload-modal-toolbar'>
      <Alert class='upload-modal-toolbar__text' :message='getHelpText'></Alert>
      <Upload
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class='upload-modal-toolbar__btn'>
        <PButton type="primary">{{ t('choose') }}</PButton>
      </Upload>
    </div>
    
    <!-- 文件列表 -->
    <FileList 
      v-model:dataSource='fileListRef'
      :actionColumns="actionColumns"
      :columns='columns'/>
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { computed, ref } from 'vue';
  import { Upload, Alert } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useMessage } from '@h/web/useMessage'
  import { buildUUID } from '@u/uuid'
  import { warn } from '@u/log'
  import { useModalInner } from '@c/PBase/Modal/index'
  import { useUploadType } from '../hooks/useUpload'
  import { basicProps } from '../props';
  import FileList from './FileList.vue';
  import { createActionColumns, createTableColumns } from './data';
  import { checkImgType, getBase64WithFile } from '../helper';
  import { FileItem, UploadResultStatus } from '../types/typing';
  import { isFunction } from '@/utils/is';

  const props = defineProps({
    ...basicProps,
    previewFileList: {
      type: Array,
      default: () => []
    }
  })
  const emits = defineEmits(['delete', 'change'])

  const { t } = useI18n('component.upload')
  const [ register, { closeModal } ] = useModalInner()
  const { createMessage } = useMessage()
  const isUploadingRef = ref(false)
  const fileListRef = ref<FileItem[]>([])
  const columns = createTableColumns()
  const actionColumns = createActionColumns(handleRemove)

  const getUploadButtonTxt = computed(() => {
    return isUploadingRef.value ? t('uploading') : t('startUpload')
  })

  const { getHelpText } = useUploadType(props)

  // 是否选择了文件
  const getIsSelectFile = computed(() => {
    return fileListRef.value.length && !fileListRef.value.every(item => item.status === UploadResultStatus.SUCCESS)
  })

  // 上传之前校验格式 且先生成fileListRef
  const beforeUpload = (file: File) => {
    const { size, name } = file
    const { maxSize } = props
    if (maxSize && size / 1024 / 1024 > maxSize) {
       createMessage.error(t('maxSizeMultiple', [maxSize]))
       return false
    }
    const commonItem = {
      uuid: buildUUID(),
      file,
      size,
      name,
      percent: 0,
      type: name.split('.').pop(),
    }

    // 如果是图片的话 则生成缩略图
    if ( checkImgType(file) ) {
      getBase64WithFile(file).then((res: string) => {
        fileListRef.value = [
          ...fileListRef.value,
          {
            ...commonItem,
            thumbUrl: res
          }
        ]
      })

    } else {
      fileListRef.value = [ ...fileListRef.value, commonItem ]
    }

    return false
  }

  // 开始逐个上传
  const uploadApiByItem = async (item: FileItem) => {
    const { api } = props
    if ( !api || !isFunction(api)) {
      return warn('api must exist and must be function')
    }
    try {
      item.status = UploadResultStatus.UPLOADING

      const ret = await api?.(
        {
          data: { },
          file: item.file,
        },
        function onUploadProgress(progressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total * 100) || 0)
          item.percent = complete
        }
      )

      item.status = UploadResultStatus.SUCCESS
      item.response = ret.data

    } catch(err) {
      item.status = UploadResultStatus.ERROR
    }
  }

  // 点击开始上传
  const handleStartUpload = () => {
    const { maxNumber, previewFileList } = props

    if ( previewFileList?.length + fileListRef.value.length > maxNumber ) {
      return createMessage.warning(t('maxNumber', [maxNumber]))
    }

    try {
      isUploadingRef.value = true

      const uploadFiles = fileListRef.value.filter(item => item.status !== UploadResultStatus.SUCCESS)

      const data = uploadFiles.map(item => {
        return uploadApiByItem(item)
      })

      isUploadingRef.value = false
    } catch(e) {
      isUploadingRef.value = false
      throw e
    }
  }

  // 移除
  function handleRemove(record) {
    fileListRef.value = fileListRef.value.filter(item => item.uuid !== record.uuid)
    emits('delete', record)
  }

  // 保存
  const handleOk = () => {
    const { maxNumber } = props
    if ( fileListRef.value.length > maxNumber ) {
      return createMessage.warning(t('maxNumber', [maxNumber]))
    }

    if ( isUploadingRef.value ) {
      return createMessage.warning(t('saveWarn'))
    }

    const fileList: string[] = []
    fileListRef.value.map(item => {
      const { status, response } = item
      if ( status === UploadResultStatus.SUCCESS ) {
        fileList.push(response.url)
      }
    })

    if ( !fileList.length ) {
      return createMessage.error(t('saveError'))
    }

    closeModal()
    emits('change', fileList)
  }
  
</script>
  
<style lang='less'>
  .upload-modal {
    &-toolbar {
      display: flex;
      align-items: center;
      margin: 8px 0;

      &__text {

      }

      &__btn {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>