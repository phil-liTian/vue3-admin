<!--
 * @Date: 2024-07-23 10:12:42
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="文本复制示例">
    <PCollapseContainer title="Copy Example">
      <div class="flex items-center gap-2">
        <Input placeholder="请输入" v-model:value="valueRef" />
        <PButton type="primary" @click="handleCopy" > Copy </PButton>
      </div>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Input } from 'ant-design-vue'
  import { ref } from 'vue';
  import { useMessage } from '@h/web/useMessage'
  import { copyText } from '@/utils/copyText';

  const valueRef = ref('')
  const { createMessage } = useMessage()
  const handleCopy = () => {
    const value = valueRef.value
    if (!value) {
      createMessage.warning('请输入需要拷贝的内容！')
      return 
    }

    copyText(valueRef.value)
  }
</script>
  
<style lang='less' scoped>
  
</style>