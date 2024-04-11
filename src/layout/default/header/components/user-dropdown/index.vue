<!--
 * @Date: 2024-04-09 19:38:24
 * @LastEditors: phil_litian
-->
<template>
  <PDropdown>
    <span :class="[prefixCls]">
      <img :class="`${prefixCls}__header`" :src="headerImg" alt="">

      <span :class="`${prefixCls}__info`">
        <span :class="`${prefixCls}__name`">
          {{ getUserInfo.username }}
        </span>
      </span>
    </span>
  </PDropdown>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { useUserStore } from '@s/modules/user'
  import headerImg from '@/assets/images/phil.png'
  const { prefixCls } = useDesign('header-user-dropdown')
  const { getUserInfo } = useUserStore()
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-header-user-dropdown';
  .@{prefix-cls} {
    cursor: pointer;
    padding: 0 10px;
    font-size: 12px;
    img {
      width: 24px;
      height: 24px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }


  }
</style>