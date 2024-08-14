<template>
  <PageWrapper title='表格增删'>
    <PCollapseContainer title="表格增删">
      <PBasicForm @register="register">
        <template #add="{ field }">
          <PButton v-if="Number(field) === 0" @click="add"> + </PButton>
          <PButton v-if="Number(field) === 0" class="ml-2" @click="batchAdd"> 批量添加表单配置 </PButton>
          <PButton v-if="Number(field) > 0" @click="del(field)"> - </PButton>
        </template>
      </PBasicForm>
    </PCollapseContainer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { useForm } from '@c/PBase/Form/index'
  import { appendSchemas } from './dataSource'
  const [ register, { appendSchemaByField, removeSchemaByField } ] = useForm({
    schemas: appendSchemas,
    labelWidth: 100,
    actionColOptions: { span: 24 },
    baseColProps: { span: 8 }
  })
  let n = 1

  const add = () => {
    appendSchemaByField({
      field: `field${n}a`,
      component: 'Input',
      label: `字段${n}`
    })
    appendSchemaByField({
      field: `field${n}b`,
      component: 'Input',
      label: `字段${n}`
    })
    appendSchemaByField({
      field: n,
      label: ``,
      slot: 'add'
    })
    n++
  }

  // 批量添加
  const batchAdd = () => {
    appendSchemaByField([
      {
        field: `field${n}a`,
        component: 'Input',
        label: `字段${n}`
      },
      {
        field: `field${n}b`,
        component: 'Input',
        label: `字段${n}`
      },
      {
        field: n,
        label: ``,
        slot: 'add'
      }
    ])
    n++
  }

  const del = (field: string) => {
    removeSchemaByField([`field${field}a`, `field${field}b`, field])
    n--
  }
</script>
  
<style lang='less' scoped>
  
</style>