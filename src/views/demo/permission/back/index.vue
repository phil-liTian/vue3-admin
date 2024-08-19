<!--
 * @Date: 2024-03-23 09:42:21
 * @LastEditors: phil_litian
-->
<template>
  <page-wrapper title="后台权限示例">
    <CurrentPermissionMode />

    <Alert type="info" class="my-4" message="点击后查看左侧菜单变化" />

    <div>
      权限切换
      <Space>
        <PButton :diabled="!isBackPermissionMode">获取用户id为1的权限</PButton>
        <PButton :diabled="!isBackPermissionMode">获取用户id为2的权限</PButton>
      </Space>
    </div>
  </page-wrapper>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import { Alert, Space } from 'ant-design-vue'
  import { useAppStore } from '@s/modules/app'
  import CurrentPermissionMode from '../currentPermissionMode.vue';
  import { PermissionModeEnum } from '@/enums/appEnum';
  const appStore = useAppStore()

  const isBackPermissionMode = computed(() => appStore.projectConfig.permissionMode === PermissionModeEnum.BACK)
</script>
  
<style lang='less' scoped>
  
</style>