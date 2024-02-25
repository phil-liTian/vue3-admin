<!--
 * @Date: 2024-02-23 22:27:15
 * @LastEditors: phil_litian
-->
<template>
  <div :class="getClass" @click="onToggleDarkMode">
    <div :class="[`${prefixCls}-inner`, 'absolute']"></div>
    <SvgIcon name="sun"></SvgIcon>
    <SvgIcon name="moon"></SvgIcon>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, unref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import { useRootSetting } from '@h/setting/useRootSetting'
  import { SvgIcon } from '@c/Icon/index'
  import { ThemeEnum } from '@/enums/appEnum'
  const { prefixCls } = useDesign('dark-switch')

  const { getDarkMode, setDarkMode } = useRootSetting()

  // 用于区分是否是暗黑主题
  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK)
  
  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--dark`]: unref(isDark)
      }
    ]
  })

  // 切换主题
  const onToggleDarkMode = () => {
    const mode = unref(isDark) ? ThemeEnum.LIGHT : ThemeEnum.DARK
    setDarkMode(mode)
  }

</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-dark-switch';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50px;
    height: 26px;
    background-color: #151515;
    border-radius: 30px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;

    &-inner {
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform .5s;
    }

    &--dark {
      .@{prefix-cls}-inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }

</style>