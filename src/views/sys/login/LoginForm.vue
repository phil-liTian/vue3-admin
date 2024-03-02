<!--
 * @Date: 2024-02-24 18:13:45
 * @LastEditors: phil_litian
-->
<template>
  <LoginFormTitle class="enter-x" />
  <Form 
    class="p-4 enter-x"
    :class="`${prefixCls}-form`"
    :model="formData">
    <FormItem name="account" class="enter-x">
      <Input v-model:value="formData.account"></Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword v-model:value="formData.password"></InputPassword>
    </FormItem>

    <ARow class="opt-view mb-2">
      <ACol :span="12">
        <Checkbox v-model:checked="rememberMe">
          {{ t('login.rememberMe') }}
        </Checkbox>
      </ACol>

      <ACol :span="12" :style="{ 'text-align': 'right' }">
        <p-button type="link">忘记密码？</p-button>
      </ACol>
    </ARow>

    <FormItem>
      <Button type="primary" size="large" block>{{ t('login.loginButton') }}</Button>
    </FormItem>

    <ARow :gutter="[16,16]">
      <ACol :md="8" :xs="24">
        <Button block>{{ t('login.mobileSignInFormTitle') }}</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block>{{ t('login.qrSignFormTitle') }}</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block>{{ t('login.signUpFormTitle') }}</Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('login.otherSignIn') }}</Divider>


    <div class="flex flex-justify-around enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
  
<script lang='ts' setup>
  import { Form, Input, Divider, Row, Col, Button, Checkbox } from 'ant-design-vue'
  import { reactive, ref } from 'vue'
  import { GithubFilled, WechatFilled, AlipayCircleFilled, GoogleCircleFilled, TwitterCircleFilled } from '@ant-design/icons-vue'
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  const { t } = useI18n('sys')

  const FormItem = Form.Item
  const InputPassword = Input.Password
  const ARow = Row
  const ACol = Col

  const { prefixCls } = useDesign('login')

  const rememberMe = ref(false)

  const formData = reactive({
    account: 'phil',
    password: '123456'
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-login';


  .@{prefix-cls}-form {
    .opt-view {
      display: flex;
      align-items: center;
    }

    .@{prefix-cls}-sign-in-way {
      .anticon {
        color: #888;
        font-size: 20px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>