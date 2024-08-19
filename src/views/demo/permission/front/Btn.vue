<template>
  <PageWrapper title="按钮权限">
    <CurrentPermissionMode />
    <p>当前角色: {{ useStore.getRoleList }}</p>

    <Divider orientation="left">组件方式判断权限</Divider>
    <PAuthority :values="RoleEnum.SUPER">
      <PButton type="primary" class="mx-4">拥有super权限可看</PButton>
    </PAuthority>

    <PAuthority :values="RoleEnum.TEST">
      <PButton type="primary" class="mx-4">拥有test权限可看</PButton>
    </PAuthority>

    <PAuthority :values="[RoleEnum.TEST, RoleEnum.SUPER]">
      <PButton type="primary" class="mx-4">拥有[super, test]权限可看</PButton>
    </PAuthority>

    <Divider orientation="left">函数方式判断权限</Divider>
    <PButton v-if="hasPermission(RoleEnum.SUPER)" type="primary" class="mx-4">拥有super权限可看</PButton>
    <PButton v-if="hasPermission(RoleEnum.TEST)" type="primary" class="mx-4">拥有test权限可看</PButton>
    <PButton v-if="hasPermission([RoleEnum.SUPER, RoleEnum.TEST])" type="primary" class="mx-4">拥有[super, test]权限可看</PButton>
    
    <Divider>指令方式判断权限</Divider>
    <PButton v-auth="RoleEnum.SUPER" type="primary" class="mx-4">拥有super权限可看</PButton>
    <PButton v-auth="RoleEnum.TEST" type="primary" class="mx-4">拥有test权限可看</PButton>
    <PButton v-auth="[RoleEnum.SUPER, RoleEnum.TEST]" type="primary" class="mx-4">拥有[super, test]权限可看</PButton>
  </PageWrapper>
</template>
  
<script lang='ts' setup>
  import { Divider } from 'ant-design-vue'
  import { RoleEnum } from '@e/roleEnum'
  import { useUserStore } from '@s/modules/user'
  import { usePermissions } from '@h/web/usePermissions'
  import CurrentPermissionMode from '../currentPermissionMode.vue';

  const { hasPermission } = usePermissions()
  const useStore = useUserStore()
</script>
  
<style lang='less' scoped>
  
</style>