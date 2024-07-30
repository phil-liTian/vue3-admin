<template>
  <PageWrapper title="消息示例">
    <PCollapseContainer title="Message">
      <PButton @click="info('Info Message')">Info</PButton>
    </PCollapseContainer>

  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useMessage } from '@h/web/useMessage'

  const { 
    createMessage, 
    createConfirm, 
    createErrorModal, 
    createInfoModal } = useMessage()

  const { success, error, warning, info, loading } = createMessage()

  

</script>
  
<style lang='less' scoped>
  
</style>