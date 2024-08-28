<template>
  <!-- 导入Json数据 -->
  <PBasicModal
    title='JSON数据'
    @close='handleClose'
    :width="800"
    :open='visible'>
    
    <p>导入格式如下</p>
    <div>
      <PCodeEditor v-model:value="state.json" />
    </div>

    <template #footer>
      <PButton @click="handleClose">关闭</PButton>
      <Upload
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-btn">
        <PButton type="primary">导入Json文件</PButton>
      </Upload>
      <PButton type="primary" @click="handleConfirmImportJson">确定</PButton>
    </template>

  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { reactive, ref } from 'vue';
  import { Upload } from 'ant-design-vue'
  import { useMessage } from '@h/web/useMessage'
  import { PCodeEditor } from '@/components/CodeEditor';
  import { IFormConfig } from '@/views/form-design/typings/v-form-component';
  import { generateKey } from '@/views/form-design/utils';
  import { useFormDesignState } from '../../../../hooks/useFormDesignState'
  const { formDesignMethods } = useFormDesignState()

  const visible = ref(false)
  const { createMessage } = useMessage()

  const state = reactive({
    json: `{
  "schemas": [
    {
      "component": "Input",
      "label": "输入框",
      "field": "input_2",
      "span": 24,
      "props": {
        "type": "text"
      }
    }
  ],
  "layout": "horizontal",
  "labelLayout": "flex",
  "labelWidth": 100,
  "labelCol": {},
  "wrapperCol": {}
}`,
  })

  const showModal = (formConfig: IFormConfig) => {
    visible.value = true
  }

  const handleClose = () => {
    visible.value = false
  }

  const beforeUpload = (e: File) => {
    const reader = new FileReader()
    reader.readAsText(e)
    reader.onload = function () {
      // 这里this指向render
      state.json = this.result as string
      handleConfirmImportJson()
    }
    return false
  }

  const handleConfirmImportJson = () => {
    try {
      const editorJsonData = JSON.parse(state.json) as IFormConfig
      if ( editorJsonData.schemas ) {
        editorJsonData.schemas.map(item => {
          generateKey(item)
        })
      }
      formDesignMethods.setFormConfig(editorJsonData)
      handleClose()

    } catch (error) {
      createMessage.error('导入失败，请检查数据格式')
    }
  }

  defineExpose({ showModal })
</script>
  
<style lang='less' scoped>
  .upload-btn {
    display: inline-block;
    margin: 0 10px;
  }
</style>