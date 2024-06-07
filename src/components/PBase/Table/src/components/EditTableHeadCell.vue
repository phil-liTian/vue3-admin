<!--
 * @Date: 2024-06-04 11:49:19
 * @LastEditors: phil_litian
-->
<template>
  <div class="edit-header-cell">
    <slot></slot>
    {{ title }}
    <EditOutlined />
  </div>
</template>
  
<script lang='ts' setup>
  import { EditOutlined } from '@ant-design/icons-vue'
  defineOptions({ name: 'EditTableHeaderCell' })
  defineProps({
    title: { type: String, default: '' }
  })
</script>
  
<style lang='less' scoped>
  
</style>