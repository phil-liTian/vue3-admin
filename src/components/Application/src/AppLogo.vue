<!--
 * @Date: 2024-02-22 14:52:53
 * @LastEditors: phil_litian
-->
<template>
  <div @click="goHome" :class="getAppLogoClass">
    <img src="../../../assets/images/logo.png" />
    <div :class="getTitleClass" class="flex ml-2" v-if="showTitle">{{ title }}</div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, defineProps } from 'vue'
  import { useGo } from '@h/web/usePage'
  import { useDesign } from '@h/web/useDesign'
  import { useGlobalSetting } from '@h/setting/index'
  const { prefixCls } = useDesign('app-logo')
  const { go } = useGo()
  const { title } = useGlobalSetting()

  const props = defineProps({
    // 主题
    theme: {
      type: String,
      default: 'dark',
      validator: (val: string): boolean => {
        return ['dark', 'light'].includes(val)
      }
    },  

    // 是否展示标题
    showTitle: {
      type: Boolean,
      default: true
    }
  })

  // applogo的类
  const getAppLogoClass = computed(() => {
    return [
      prefixCls
    ]
  })

  // title的类
  const getTitleClass = computed(() => {
    return [
      `${prefixCls}__title`
    ]
  })

  const goHome = () => {
    go()
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;

    img {
      width: 32px;
    }

    &__title {
      color: @white;
    }
  }
</style>