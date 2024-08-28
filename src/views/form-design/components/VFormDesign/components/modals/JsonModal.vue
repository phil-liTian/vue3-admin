<template>
  <!-- 导出 -->
  <PBasicModal
    title='JSON数据'
    :width="800"
    @close='handleClose'
    :footer="null"
    :open="visible">
    <PreviewCode :editor-json="editorJson" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { computed, Ref, ref } from 'vue';
  import { IFormConfig } from '@/views/form-design/typings/v-form-component';
  import PreviewCode from './PreviewCode.vue'

  const visible = ref(false)
  const jsonData = ref<Ref<IFormConfig>>(null)

  const showModal = (schema: IFormConfig) => {
    jsonData.value = schema as IFormConfig
    visible.value = true
  }

  const editorJson = computed(() => {
    return JSON.stringify(jsonData.value, null, 2)
  })

  const handleClose = () => {
    visible.value = false
  }

  defineExpose({ showModal })

</script>
  
<style lang='less' scoped>
  
</style>