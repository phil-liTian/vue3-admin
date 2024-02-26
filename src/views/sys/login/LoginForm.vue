<!--
 * @Date: 2024-02-24 18:13:45
 * @LastEditors: phil_litian
-->
<template>
  <LoginFormTitle class="enter-x" />
  <Form 
    class="p-4 enter-x"
    :model="formData">
    <FormItem name="account" class="enter-x">
      <Input v-model:value="formData.account"></Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword v-model:value="formData.password"></InputPassword>
    </FormItem>

    <FormItem>
      <Button type="primary" size="large" block>登陆</Button>
    </FormItem>

    <ARow :gutter="[16,16]">
      <ACol :md="8" :xs="24">
        <Button block>手机登录</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block>二维码登录</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block>注册</Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">其它登陆方式</Divider>


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
  import { Form, Input, Divider, Row, Col, Button } from 'ant-design-vue'
  import { reactive } from 'vue'
  import { GithubFilled, WechatFilled, AlipayCircleFilled, GoogleCircleFilled, TwitterCircleFilled } from '@ant-design/icons-vue'
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useDesign } from '@h/web/useDesign'

  const FormItem = Form.Item
  const InputPassword = Input.Password
  const ARow = Row
  const ACol = Col

  const { prefixCls } = useDesign('login')

  const formData = reactive({
    account: 'phil',
    password: '123456'
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-login';


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
</style>