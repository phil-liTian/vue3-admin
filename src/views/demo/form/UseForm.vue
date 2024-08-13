<template>
  <PageWrapper title='UseForm'>
    <PButton class="mb-2" type='primary' @click='handleShowDrawer'>更改设置</PButton>

    <PCollapseContainer title='useForm'>
      <PBasicForm @register='register' />
    </PCollapseContainer>

    <PDrawer v-model:open='open' title='更改设置' placemend='right'>
      <PBasicForm @register='settingRegister'>

      </PBasicForm>
    </PDrawer>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useForm } from '@c/PBase/Form/index'
  import { useSchemas, settingSchemas } from './dataSource'
  const open = ref<boolean>(false)

  const handleShowDrawer = () => {
    open.value = true
  }

  const [ register ] = useForm({
    labelWidth: 120,
    schemas: useSchemas
  })

  const [ settingRegister ] = useForm({
    schemas: settingSchemas
  })
</script>
  
<style lang='less' scoped>
  
</style>