<!--
 * @Date: 2024-02-24 12:58:53
 * @LastEditors: phil_litian
-->
<template>
  <DropDown :drop-menu-list="LocalList">
    <span class="cursor-pointer">
      <Icon icon="ion:language" />
    </span>
  </DropDown>
</template>
  
<script lang='ts' setup>
  import { DropDown } from '@c/DropDown/index'
  import { LocalList } from '@/settings/localeSetting'
  import Icon from '@c/Icon/Icon.vue'


</script>
  
<style lang='less' scoped>
  
</style>