<!--
 * @Date: 2024-07-23 11:47:40
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="右键菜单示例">
    <PCollapseContainer title="Simple">
      <PButton type="primary" @contextmenu="handleContext"> Right Click on me </PButton>
    </PCollapseContainer>

    <PCollapseContainer class="mt-5" title="Multiple">
      <PButton type="primary" @contextmenu="handleMultipleContext"> Right Click on me </PButton>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useContextMenu } from '@h/web/useContextMenu'

  const [ createContextMenu ] = useContextMenu()
  const handleContext = (e: MouseEvent) => {
    createContextMenu({
      event: e,
      items: [
        {
          label: '复制',
          icon: 'ant-design:copy-outlined',
          handler: () => {
            console.log('复制');
          }
        },
        {
          label: '粘贴',
          icon: 'ant-design:paste-outlined',
          handler: () => {
            console.log('粘贴');
          }
        }
      ]
    })

  }

  const handleMultipleContext = (e: MouseEvent) => {
    createContextMenu({
      event: e,
      items: [
        {
          label: 'New-1',
          icon: 'ic:baseline-settings',
          children: [
            { label: 'New-1-1', divider: true },
            { label: 'New-1-2', disabled: true }
          ]
        },
        {
          label: 'New-2',
          icon: 'mdi:bell-settings',
          children: [
            { label: 'New-2-1' }
          ]
        }
      ]
    })
  }
</script>
  
<style lang='less' scoped>
  
</style>