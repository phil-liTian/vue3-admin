<!--
 * @Date: 2024-03-02 11:00:17
 * @LastEditors: phil_litian
-->
<template>
  <div v-if="getShow">
    <LoginFormTitle />

    <Form>
      <FormItem></FormItem>

      <FormItem>
        <p-button class="mb-2" block size="large" type="primary">重置</p-button>
        <p-button block size="large" @click="backLoginState">{{ t('login.backSignIn') }}</p-button>
      </FormItem>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue'
  import { Form } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { useLoginState, LoginStateEnum } from './useLogin'
  import LoginFormTitle from './LoginFormTitle.vue';

  const { t } = useI18n('sys')
  const { getLoginState, backLoginState } = useLoginState()

  const FormItem = Form.Item


  const getShow = computed(() => getLoginState.value === LoginStateEnum.RESET_PASSWORD)
</script>
  
<style lang='less' scoped>
  
</style>