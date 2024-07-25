<!--
 * @Date: 2024-07-25 13:46:26
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="打印示例">
    <PCollapseContainer title="json打印表格">
      <PButton type="primary" @click="jsonPrint"> 打印 </PButton>
    </PCollapseContainer>

    <PButton class="mt-5" @click="imagePrint">Image Print</PButton>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import printJS from 'print-js'
  const jsonPrint = () => {
    printJS({
      type: 'json',
      properties: ['name'],
      printable: [
        { name: 'phil' },
        { name: 'jack' },
        { name: '张三' },
      ]
    })
  }

  const imagePrint = () => {
    printJS({
      printable: 'https://picsum.photos/200/300',
      type: 'image',
      imageStyle: 'width: 100px; height: 100px;'
    })
  }
</script>
  
<style lang='less' scoped>
  
</style>