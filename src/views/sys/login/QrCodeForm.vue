<!--
 * @Date: 2024-03-02 10:59:32
 * @LastEditors: phil_litian
-->
<template>
  <div v-if="getShow">
    <LoginFormTitle  />

    <div>
      
      
      <p-button @click="backLoginState" block size="large">{{ t('login.backSignIn') }}</p-button>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import LoginFormTitle from './LoginFormTitle.vue';
  import { computed } from 'vue';
  import { useLoginState, LoginStateEnum } from './useLogin'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('sys')

  const { getLoginState, backLoginState } = useLoginState()
  console.log('getLoginState', getLoginState.value);

  const getShow = computed(() => getLoginState.value === LoginStateEnum.QR_CODE)
</script>
  
<style lang='less' scoped>
  
</style>