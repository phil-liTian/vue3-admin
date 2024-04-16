<!--
 * @Date: 2024-04-09 19:38:24
 * @LastEditors: phil_litian
-->
<template>
  <PDropdown :dropMenuList="menuList" @menuEvent="handleMenuClick">
    <span :class="[prefixCls]">
      <img :class="`${prefixCls}__header`" :src="headerImg" alt="">

      <span :class="`${prefixCls}__info`">
        <span :class="`${prefixCls}__name`">
          {{ getUserInfo.username }}
        </span>
      </span>
    </span>
  </PDropdown>

  <LockAction @register="register"/>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import { useUserStore } from '@s/modules/user'
  import headerImg from '@/assets/images/phil.png'
  import { userDropdownMenuList } from './data'
  import { DropMenu } from '@/components/DropDown/src/types'
  import { useModal } from '@c/PBase/Modal/src/hooks/useModal'
  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'
  const { prefixCls } = useDesign('header-user-dropdown')
  const { getUserInfo } = useUserStore()
  const [register, { openModal }] = useModal()
  const menuList = ref(userDropdownMenuList)
  
  const LockAction = createAsyncComponent(() => import('../../components/lock/LockModal.vue'))

  const handleLock = () => {
    openModal(true)
  }

  const handleMenuClick = (item: DropMenu) => {
    switch(item.key) {
      case 'lock': {
        handleLock()
        break
      }
    }
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-header-user-dropdown';
  .@{prefix-cls} {
    display: inline-block;
    cursor: pointer;
    padding: 0 10px;
    height: @header-height;
    font-size: 12px;

    &:hover {
      background-color: @header-light-bg-hover-color;
    }

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