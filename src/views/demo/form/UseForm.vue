<template>
  <PageWrapper title='UseForm'>
    <PButton class="mb-2" type='primary' @click='handleShowDrawer'>更改设置</PButton>

    <PCollapseContainer title='useForm'>
      <PBasicForm @register='register' />
    </PCollapseContainer>

    <PDrawer v-model:open='open' title='更改设置' placemend='right'>
      <template #extra>
        <Space>
          <PButton>重置设置</PButton>
          <PButton type="primary">应用</PButton>
        </Space>
      </template>
      <PBasicForm @register='settingRegister'>
        <template #other='{ model }'>
          <Space>
            <PButton>修改重置按钮</PButton>
            <PButton>修改查询按钮</PButton>
            <PButton>联动回显</PButton>
          </Space>
        </template>
      </PBasicForm>
    </PDrawer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { Space } from 'ant-design-vue'
  import { useForm } from '@c/PBase/Form/index'
  import { useSchemas, settingSchemas } from './dataSource'
  const open = ref<boolean>(false)

  const handleShowDrawer = () => {
    open.value = true
  }

  const [ register ] = useForm({
    labelWidth: 120,
    schemas: useSchemas,
    actionColOptions: {
      span: 24
    }
  })

  const [ settingRegister ] = useForm({
    schemas: settingSchemas,
    size: 'small',
    labelWidth: 120,
    compact: true,
    showActionButtonGroup: false
  })
</script>
  
<style lang='less' scoped>
  
</style>