<!--
 * @Date: 2024-03-02 10:59:32
 * @LastEditors: phil_litian
-->
<template>
  <div v-if="getShow">
    <LoginFormTitle  />


    <Form>
      <FormItem>
        
      </FormItem>

      <p-button class="mb-2" size="large" block type="primary">{{ t('login.signUpFormTitle') }}</p-button>
      <p-button size="large" @click="backLoginState" block>{{ t('login.backSignIn') }}</p-button>
    </Form>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed } from 'vue';
  import { Form } from 'ant-design-vue'
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useLoginState, LoginStateEnum } from './useLogin'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('sys')

  const { getLoginState, backLoginState } = useLoginState()
  console.log('getLoginState', getLoginState.value);
  const FormItem = Form.Item

  const getShow = computed(() => getLoginState.value === LoginStateEnum.REGISTER)
</script>
  
<style lang='less' scoped>
  
</style>