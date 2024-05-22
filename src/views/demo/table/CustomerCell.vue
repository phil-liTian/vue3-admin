<!--
 * @Date: 2024-05-13 21:53:19
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable @register="register">
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'id'">ID: {{ record.id }}</template>
        <template v-if="column.dataIndex === 'no'">
          <Tag color="green">{{ record.no }}</Tag>
        </template>
      </template>
    </PBasicTable>
  </div>
</template>
  
<script lang='tsx' setup>
  import { Tag } from 'ant-design-vue'
  import { h } from 'vue'
  import { demoListApi } from '@/api/demo/table'
  import { useTable, BasicColumn } from '@c/PBase/Table/index'

  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      helpMessage: <div>这是tsx渲染出来的helpMessage</div>
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 100,
      helpMessage: h('div', '这是vue h函数渲染出来的helpMessage')
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 80,
      align: 'center'
    },
    {
      title: '编号',
      dataIndex: 'no'
    }
  ]
  // 同样的tableCell TableImg
  const [ register ] = useTable({
    title: '自定义列内容',
    columns,
    api: demoListApi
  })
</script>
  
<style lang='less' scoped>
  
</style>