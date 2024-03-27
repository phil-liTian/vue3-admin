<!--
 * @Date: 2024-02-24 12:58:53
 * @LastEditors: phil_litian
-->
<template>
  <DropDown 
    :trigger="['click']"
    :drop-menu-list="LocaleList"
    overlayClassName="app-locale-picker-overlay"
    :selectedKeys="selectedKeys"
    @menuClick="handleChangeLocale">
    <span class="cursor-pointer">
      <Icon icon="ion:language" />
    </span>
  </DropDown>
</template>
  
<script lang='ts' setup>
  import { ref, watchEffect, watch, unref } from 'vue';
  import { DropDown } from '@c/DropDown/index'
  import { LocaleList } from '@/settings/localeSetting'
  import Icon from '@c/Icon/Icon.vue'
  import { useLocale } from '@/locales/useLocale';

  const selectedKeys = ref<string[]>(['en'])
  const { changeLocale, locale } = useLocale()

  // 切换语言选中状态
  watchEffect(() => {
    selectedKeys.value = [unref(locale)]
  })

  const handleChangeLocale = (item) => {
    changeLocale(item.key)
  }

</script>
  
<style lang='less'>
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 120px;
    }
  }
</style>