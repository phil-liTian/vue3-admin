<!--
 * @Date: 2024-04-12 16:22:51
 * @LastEditors: phil_litian
-->
<template>
  <PBasicModal @register="register">
    <div>
      <div :class="`${prefixCls}-footer`">
        <PButton type="primary" @click="handleLock">锁定</PButton>
      </div>
    </div>
  </PBasicModal>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { useLockStore } from '@s/modules/lock'
  import { useModal } from '@c/PBase/Modal/src/hooks/useModal'

  const [ register ] = useModal()
  const { prefixCls } = useDesign('header-lock-modal')
  const { setLockInfo } = useLockStore()
  

  const handleLock = () => {
    setLockInfo({ isLock: true })
  }
</script>
  
<style lang='less' scoped>
  
</style>