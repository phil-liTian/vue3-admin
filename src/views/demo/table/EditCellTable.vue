<!--
 * @Date: 2024-06-04 11:27:44
 * @LastEditors: phil_litian
-->
<template>
  <div class="p-4">
    <PBasicTable 
      @register="register"
      @edit-end="handleEditEnd" />
  </div>
</template>
  
<script lang='ts' setup> 
  import { demoListApi } from '@a/demo/table'
  import { useTable, BasicColumn } from '@c/PBase/Table/index'
  const columns: BasicColumn[] = [
    {
      title: '输入框',
      dataIndex: 'name',
      width: 200,
      edit: true,
      editComponentProps: {
        prefix: '¥'
      }
    },
    {
      title: '默认输入状态',
      dataIndex: 'name7',
      width: 200,
      edit: true,
      editable: true
    },
    {
      title: '输入校验框',
      dataIndex: 'name1',
      width: 200,
      edit: true
    },
    {
      title: '输入框校验（不可输入2）',
      dataIndex: 'name2',
      edit: true,
      width: 200,
      editRule: async text => {
        return text === '2' ? '不能输入该值' : ''
      }
    },
    {
      title: '数字输入框',
      dataIndex: 'id',
      edit: true,
      editComponent: 'InputNumber',
      width: 200,
      editComponentProps: () => {
        return {
          min: 0,
          max: 100
        }
      }
    },
    {
      title: '下拉框',
      dataIndex: 'name3',
      edit: true,
      width: 200,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          { label: 'option1', value: 1 },
          { label: 'option2', value: 2 },
        ]
      }
    },
    // TODO 远程下拉ApiSelect、ApiRadioGroup
    {
      title: '时间选择',
      dataIndex: 'time',
      edit: true,
      editComponent: 'TimePicker',
      width: 200,
      editComponentProps: {
        format: 'HH:mm',
        valueFormat: 'HH:mm'
      }
    },
    {
      title: '日期选择',
      dataIndex: 'date',
      edit: true,
      editComponent: 'DatePicker',
      width: 200,
      editComponentProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      title: '勾选框',
      dataIndex: 'name5',
      edit: true,
      editComponent: 'Checkbox',
      width: 200
    },
    {
      title: '单选框',
      dataIndex: 'name6',
      edit: true,
      editComponent: 'Radio',
      width: 200
    },
    {
      title: '单选框',
      dataIndex: 'radio1',
      edit: true,
      editComponent: 'RadioGroup',
      width: 200,
      editComponentProps: {
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ]
      }
    },
    // {
    //   title: '单选按钮框',
    //   dataIndex: 'radio2',
    //   edit: true,
    //   editComponent: 'RadioButtonGroup',
    //   editComponentProps: {
    //     options: [
    //       { label: '选项1', value: '1' },
    //       { label: '选项2', value: '2' },
    //     ]
    //   }
    // }

  ]
  const [ register ] = useTable({
    title: '可编辑单元格示例',
    columns,
    api: demoListApi,
    bordered: true,
    showIndexColumn: false
  })

  const handleEditEnd = () => {
    console.log('handleEditEnd');
  }
</script>
  
<style lang='less' scoped>
  
</style>