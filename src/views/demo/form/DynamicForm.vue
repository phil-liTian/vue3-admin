<template>
  <PageWrapper title="动态表单">
    <div class="mb-4">
      <PButton @click="changeLabel3" class="mr-2">更改字段3label</PButton>
      <PButton @click="changeLabel23" class="mr-2">同时更改字段2、字段3label</PButton>
			<PButton @click="handleAddField" class="mr-2">在字段3后面增加字段10</PButton>
			<PButton @click="deleteField" class="mr-2">删除字段1</PButton>
    </div>

    <PCollapseContainer title="动态表单,动态根据表单内其他值变化">
      <PBasicForm @register="register" />
    </PCollapseContainer>

    <PCollapseContainer title="componentProps动态改变" class="mt-5">
      <PBasicForm @register="register1" @submit="handleSubmit" />
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
 import { useForm } from '@c/PBase/Form/index' 
 import { dynamicSchemas, dynamicSchemas1 } from './dataSource'
 const [ register, { updateSchema, removeSchemaByField, appendSchemaByField } ] = useForm({
  schemas: dynamicSchemas,
  labelWidth: 120,
  actionColOptions: { span: 24 }
 })

 const [ register1 ] = useForm({
	schemas: dynamicSchemas1,
	labelWidth: 120,
	actionColOptions: { span: 24 }
 })

 const changeLabel3 = () => {
	updateSchema({
		field: 'field3',
		label: '字段3 New'
	})
 }

 const changeLabel23 = () => {
	updateSchema([
		{
			field: 'field2',
			label: '字段2 New++'
		},
		{
			field: 'field3',
			label: '字段3 New++'
		}
	])
 }

 const handleAddField = () => {
	appendSchemaByField({
		field: 'field10',
		label: '字段10',
		component: 'Input',
		colProps: {
			span: 8
		}
	}, 'field3')
 }

 const deleteField = () => {
	removeSchemaByField('field1')
 }

 const handleSubmit = values => {
	console.log('values', values);
 }
</script>
  
<style lang='less' scoped>
  
</style>