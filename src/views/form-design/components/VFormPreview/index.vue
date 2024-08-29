<template>
  <PBasicModal
    :width="800"
    @close='handleClose'
    @ok="handleGetData"
    cancelText='关闭'
    okText="获取数据"
    title="预览(支持栅格布局)"
    :open="visible">
    
    <VFormCreate
      v-model:formModel="formModel"
      :form-config="state.formConfig">

    </VFormCreate>

    <JsonModal ref="jsonModal" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { reactive, ref } from 'vue'
  import VFormCreate from '../VFormCreate/index.vue'
  import { IFormConfig } from '../../typings/v-form-component';
  import JsonModal from '../VFormDesign/components/modals/JsonModal.vue';
  import { IToolbarMethods } from '../../typings/form-type';
  import { IAnyObject } from '../../typings/base-type'

  const visible = ref(false)
  const jsonModal = ref<IToolbarMethods>(null)
  const state = reactive({
    formConfig: {} as IFormConfig,
    fApi: {} as any,
    formModel: {} as IAnyObject
  })

  const showModal = (formConfig: IFormConfig) => {
    // @ts-ignore
    state.formConfig = formConfig
    visible.value = true
  }

  const handleClose = ()  => {
    visible.value = false
    state.formModel = {}
  }

  const handleGetData = async () => {
    const data = await state.fApi.submit()
    jsonModal.value.showModal(data)
  }

  defineExpose({ showModal })
</script>
  
<style lang='less' scoped>
  
</style>