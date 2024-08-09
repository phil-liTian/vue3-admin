<!--
 * @Date: 2024-07-30 19:36:05
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="消息示例">
    <PCollapseContainer title="Message">
      <PButton color="info" class="mr-2" @click="info('Info Message')">Info</PButton>
      <PButton color="warning" class="mr-2" @click="warning('Warning Message')">warning</PButton>
      <PButton color="success" class="mr-2" @click="success('Success Message')">success</PButton>
      <PButton color="error" class="mr-2" @click="error('Error Message')">error</PButton>
      <PButton @click="loading('loading...')" type="primary">loading</PButton>
    </PCollapseContainer>

    <PCollapseContainer class="mt-5" title="Confirm">
      <PButton class="mr-2" @click="handleConfirm('info')"> Info </PButton>
      <PButton class="mr-2" @click="handleConfirm('warning')" color="warning"> Warning </PButton>
      <PButton class="mr-2" @click="handleConfirm('success')" color="success"> Success </PButton>
      <PButton class="mr-2" @click="handleConfirm('error')" color="error"> Error </PButton>
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

  const { info, success, warning, error, loading } = createMessage

  const handleConfirm = (type: "info" | "success" | "warning" | "error") => {
    createConfirm({
      iconType: type,
      title: 'Tip',
      content: 'content message...'
    })
  }

</script>
  
<style lang='less' scoped>
  
</style>