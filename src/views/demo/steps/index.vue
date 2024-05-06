<!--
 * @Date: 2024-03-22 23:05:41
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="引导页" content='用于给用户的操作指引'>
    <PButton type="primary" @click="handleStart">开始</PButton>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { driver } from 'driver.js'
  import { useDesign } from '@h/web/useDesign'
  import "driver.js/dist/driver.css";
  const { prefixVar } = useDesign('')

  const handleStart = () => {
    driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: 'welcome to Phil Admin',
            description: 'hello world!'
          }
        },
        {
          element: `.${prefixVar}-layout-header-trigger`,
          popover: {
            title: 'Collapse Button',
            description: 'This is the menu collapse button.'
          }
        },
        {
          element: `.${prefixVar}-layout-header-action`,
          popover: {
            title: 'User Action',
            description: 'This is the user function area.'
          }
        }
      ]
    }).drive()
  }
</script>
  
<style lang='less' scoped>
  
</style>