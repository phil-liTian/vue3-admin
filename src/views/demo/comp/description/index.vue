<!--
 * @Date: 2024-04-12 13:44:43
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="详情组件示例">
    <PDescription 
      title="基础示例"
      :collapseOptions="{ helpMessage: 'help Me' }"
      :schema="schema"
      :data="mockData" />

    <PDescription 
      class="my-4"
      title="垂直示例"
      layout="vertical"
      :column="2"
      :collapseOptions="{ helpMessage: 'help Me' }"
      :schema="schema"
      :data="mockData" />

    <PDescription @register="register" class="mt-4" />
    <PDescription @register="register1" class="mt-4" />
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { DescItem, useDescription } from '@c/PBase/Description/index'
  import { mockData } from './mockData'

  defineOptions({ name: 'DescriptionDemo' })
  const schema: DescItem[] = [
    { label: '用户名', field: 'username' },
    { label: '用户昵称', field: 'nickName' },
    { label: '联系电话', field: 'phone' },
    { label: '邮箱', field: 'email' },
    { label: '地址', field: 'address' },
  ]

  const [ register ] = useDescription({
    title: 'useDescription',
    schema,
    data: mockData
  })

  const [ register1 ] = useDescription({
    title: '无边框',
    bordered: false,
    schema,
    data: mockData
  })
</script>
  
<style lang='less' scoped>
  
</style>