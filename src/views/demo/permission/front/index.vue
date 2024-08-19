<!--
 * @Date: 2024-03-23 09:42:00
 * @LastEditors: phil_litian
-->
<template>
  <PageWrapper title="前端权限">
    <CurrentPermissionMode />

    <p>当前角色: {{ useStore.getRoleList }}</p>

    <Alert type="info" class="my-4" message="点击后注意左侧菜单变化"></Alert>

    <div>
      权限切换(请先切换当前权限模式为前端模式):
      <Space>
        <PButton @click="changeRole(RoleEnum.SUPER)" :type="isSuper ? 'primary' : 'default'">{{ RoleEnum.SUPER }}</PButton>
        <PButton @click="changeRole(RoleEnum.TEST)" :type="isTest ? 'primary' : 'default'">{{ RoleEnum.TEST }}</PButton>
      </Space>
    </div>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import { Space, Alert } from 'ant-design-vue'
  import CurrentPermissionMode from '../currentPermissionMode.vue'
  import { RoleEnum } from '@e/roleEnum'
  import { useUserStore } from '@s/modules/user'
  import { usePermissions } from '@/hooks/web/usePermissions';
  const useStore = useUserStore()
  const { changeRole } = usePermissions()

  const isSuper = computed(() => useStore.getRoleList.includes(RoleEnum.SUPER))
  const isTest = computed(() => useStore.getRoleList.includes(RoleEnum.TEST))
</script>
  
<style lang='less' scoped>
  
</style>