<!--
 * @Date: 2024-03-02 10:59:20
 * @LastEditors: phil_litian
-->
<template>
  <div v-if="getShow">
    <LoginFormTitle />
    
    <Form>
      <FormItem></FormItem>

      <FormItem>
        <p-button size="large" class="mb-2" block type="primary">{{ t('login.loginButton') }}</p-button>
        <p-button @click="backLoginState" size="large" block>{{ t('login.backSignIn') }}</p-button>
      </FormItem>
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
const FormItem = Form.Item

const { getLoginState, backLoginState } = useLoginState()
console.log('getLoginState', getLoginState.value);

const getShow = computed(() => getLoginState.value === LoginStateEnum.MOBILE)

</script>
  
<style lang='less' scoped>
  
</style>