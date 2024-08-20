<template>
  <PBasicModal
    width='800px'
    :showOkBtn='false'
    title='预览'>
    <FileList 
      :data-source="fileListRef"
      :columns="columns"
      :actionColumns="actionColumns" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref, watch } from 'vue';
  import { previewProps } from '../props';
  import FileList from './FileList.vue';
  import { createPreviewActionColumns, createPreviewColumns } from './data'
  import { isArray } from '@/utils/is';
  import { downloadByUrl } from '@/utils/file/download'
  const props = defineProps(previewProps)
  const emits = defineEmits(['list-change', 'delete'])
  const fileListRef = ref([])
  watch(() => props.value, value => {
    if ( !isArray(value)) return []
    fileListRef.value = value.map(item => {
      return {
        thumbUrl: item,
        type: item.split('.').pop() || '',
        name: item.split('/').pop() || '',
      }
    })
  }, { immediate: true })
  const columns = createPreviewColumns()
  const actionColumns = createPreviewActionColumns({
    handleRemove,
    handleDownload
  })

  function handleRemove(record) {
    fileListRef.value = fileListRef.value.filter(item => item.thumbUrl !== record.thumbUrl)

    emits('delete', record.thumbUrl)
    emits('list-change', [record.thumbUrl])
  }

  function handleDownload(record) {
    const { thumbUrl } = record
    if ( thumbUrl ) {
      downloadByUrl({ url: thumbUrl })
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>