<template>
  <div>
    <PCodeEditor :value="editorJson" />
    <div class="copy-btn-box">
      <PButton
        class="copy-btn"
        type="primary"
        @click="handleCopyData">
        复制数据
      </PButton>
      <PButton type="primary" @click="handleExportJson">导出代码</PButton>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { useMessage } from '@h/web/useMessage'
  import { copyText } from '@/utils/copyText';
  import { PCodeEditor } from '@c/CodeEditor/index'

  const props = defineProps({
    fileFormat: {
      type: String,
      default: 'json'
    },
    editorJson: {
      type: String,
      default: ''
    }
  })

  const { createMessage } = useMessage()
  const handleCopyData = () => {
    if ( !props.editorJson ) {
      return createMessage.error('暂无可拷贝数据')
    }
    copyText(props.editorJson)
  }

  const exportData = (data: string, fileName = `file.${props.fileFormat}`) => {
    let content = 'data:text/csv;charset=utf-8,'
    content += data
    const encodeUri = encodeURI(content)
    const actions = document.createElement('a')
    actions.setAttribute('href', encodeUri)
    actions.setAttribute('download', fileName)
    actions.click()
  }

  const handleExportJson = () => {
    exportData(props.editorJson)
  }
</script>
  
<style lang='less' scoped>
  .copy-btn-box {
    padding-top: 8px;
    text-align: center;

    .copy-btn {
      margin-right: 8px;
    }
  }
</style>