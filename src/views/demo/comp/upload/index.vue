<template>
  <PageWrapper title='上传组件示例'>
    <Alert message='基础示例'></Alert>
    <PBasicUpload class='my-5' />

    <Alert message='嵌入表单，加入表单校验'></Alert>
    <PBasicForm class='my-5' @register='register'></PBasicForm>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Alert } from 'ant-design-vue';
  import { useForm } from '@c/PBase/Form/index';

  const [ register ] = useForm({
    showActionButtonGroup: false,
    schemas: [
      { 
        field: 'field',
        component: 'Upload',
        label: '上传',
        componentProps: {
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
</script>
  
<style lang='less' scoped>
  
</style>