<template>
  <PBasicModal
    title="预览(不支持布局)"
    @close="handleClose"
    @ok="handleGetData"
    okText="获取数据"
    cancelText="关闭"
    :width="800"
    :open="visible">
    
    <PBasicForm v-bind="formConfig" @register="register" />
    
    <JsonModal ref="jsonModal" />
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue';
  import { PBasicForm, useForm } from '@c/PBase/Form/index'
  import { IFormConfig } from '../../typings/v-form-component';
  import JsonModal from '../VFormDesign/components/modals/JsonModal.vue';
  import { IToolbarMethods } from '../../typings/form-type';

  const visible = ref(false)
  const jsonModal = ref<IToolbarMethods>(null)
  const formConfig = ref({})

  const [ register, { validateFields } ] = useForm()

  const showModal = (schema: IFormConfig) => {
    visible.value = true
    formConfig.value = schema
  }

  const handleClose = ()  => {
    visible.value = false
  }

  const handleGetData = () => {
    validateFields().then(data => {
      console.log(data)

      jsonModal.value?.showModal(data)
    })
  }

  defineExpose({ showModal })

</script>
  
<style lang='less' scoped>
  
</style>