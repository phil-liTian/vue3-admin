<!--
 * @Date: 2024-02-24 20:42:58
 * @LastEditors: phil_litian
-->
<template>
  <h2 class="mb-3 font-bold enter-x">
    {{ getFormTitle }}
  </h2>
</template>
  
<script lang='ts' setup>
  import { computed, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('sys')
  const { getLoginState } = useLoginState()

  const getFormTitle = computed(() => {
    const titleMap = {
      [LoginStateEnum.LOGIN]: t('login.signInFormTitle'),
      [LoginStateEnum.MOBILE]: t('login.mobileSignInFormTitle'),
      [LoginStateEnum.QR_CODE]: t('login.qrSignFormTitle'),
      [LoginStateEnum.REGISTER]: t('login.signUpFormTitle'),
      [LoginStateEnum.RESET_PASSWORD]: t('login.forgetFormTitle')
    }

    return titleMap[unref(getLoginState)]
  })
</script>
  
<style lang='less' scoped>
  
</style>