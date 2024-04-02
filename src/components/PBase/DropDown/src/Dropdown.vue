<template>
  <Dropdown>
    <span>
      <slot></slot>
    </span>
    <template #overlay>
      
    </template>
  </Dropdown>
</template>
  
<script lang='ts' setup>
  import { Dropdown } from 'ant-design-vue'
  defineOptions({ name: 'PDropdown' })
</script>
  
<style lang='less' scoped>
  
</style>