<!--
 * @Date: 2024-02-24 12:58:53
 * @LastEditors: phil_litian
-->
<template>
  <DropDown 
    :drop-menu-list="LocaleList"
    overlayClassName="app-locale-picker-overlay">
    <span class="cursor-pointer">
      <Icon icon="ion:language" />
    </span>
  </DropDown>
</template>
  
<script lang='ts' setup>
  import { DropDown } from '@c/DropDown/index'
  import { LocaleList } from '@/settings/localeSetting'
  import Icon from '@c/Icon/Icon.vue'


</script>
  
<style lang='less'>
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 120px;
    }
  }
</style>