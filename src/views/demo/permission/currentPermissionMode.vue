<template>
  <div>
    当前权限模式:
    <PButton type="link">{{ permissionMode === 'BACK' ? '后台权限模式' : '前端角色权限模式' }}</PButton>
    <PButton type="primary" class="ml-4" @click="togglePermissionMode">切换权限</PButton>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import { usePermissions } from '@h/web/usePermissions'
  import { useAppStore }  from '@s/modules/app'
  defineOptions({ name: 'CurrentPermissionMode' })

  const { getProjectConfig } = useAppStore()
  const { togglePermissionMode } = usePermissions()

  const permissionMode = computed(() => getProjectConfig.permissionMode)
</script>
  
<style lang='less' scoped>
  
</style>