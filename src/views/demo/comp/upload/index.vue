<template>
  <PageWrapper title='上传组件示例'>
    <Alert message='基础示例'></Alert>
    <PBasicUpload
      :api="uploadApi"
      :accept="['image/*']"
      class='my-5' />

    <Alert message='嵌入表单，加入表单校验'></Alert>
    <PBasicForm 
      class='my-5' @register='register' @submit="handleSubmit"></PBasicForm>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue';
  import { useForm } from '@c/PBase/Form/index';
  import { uploadApi } from '@a/sys/upload'

  const [ register ] = useForm({
    // showActionButtonGroup: false,
    actionColOptions: {
      span: 24
    },
    schemas: [
      { 
        field: 'field',
        component: 'Upload',
        label: '上传',
        labelWidth: '150',
        // required: true,
        rules: [ { required: true, message: '请先选择文件' } ],
        componentProps: {
          api: uploadApi,
          // action: 'https://jsonplaceholder.typicode.com/posts/',
          // headers: {
          //   authorization: 'authorization-text',
          // },
          // onChange(info) {
          //   if (info.file.status !== 'uploading') {
          //     console.log(info.file, info.fileList);
          //   }
          // }
        }
      }
    ],
  })

  const handleSubmit = values => {
    console.log('values===>', values);
  }
</script>
  
<style lang='less' scoped>
  
</style>