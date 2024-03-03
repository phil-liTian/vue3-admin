<!--
 * @Date: 2024-02-24 18:13:45
 * @LastEditors: phil_litian
-->
<template>
  <LoginFormTitle v-if="getShow" class="enter-x" />
  <Form 
    class="p-4 enter-x"
    ref="formRef"
    :class="`${prefixCls}-form`"
    :model="formData"
    :rules="getFormRules"
    v-if="getShow">
    <FormItem name="account" class="enter-x">
      <Input 
        size="large"
        :placeholder="t('login.accountPlaceholder')"
        v-model:value="formData.account">
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword 
        size="large"
        :placeholder="t('login.passwordPlaceholder')"
        v-model:value="formData.password">
      </InputPassword>
    </FormItem>

    <ARow class="opt-view mb-2">
      <ACol :span="12">
        <Checkbox
          v-model:checked="rememberMe">
          {{ t('login.rememberMe') }}
        </Checkbox>
      </ACol>

      <ACol :span="12" :style="{ 'text-align': 'right' }">
        <p-button type="link" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">{{ t('login.forgetPassword') }}</p-button>
      </ACol>
    </ARow>

    <FormItem>
      <Button type="primary" @click="handleLogin" size="large" :loading="loading" block>{{ t('login.loginButton') }}</Button>
    </FormItem>

    <ARow :gutter="[16,16]">
      <ACol :md="8" :xs="24">
        <Button @click="setLoginState(LoginStateEnum.MOBILE)" block>{{ t('login.mobileSignInFormTitle') }}</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button @click="setLoginState(LoginStateEnum.QR_CODE)" block>{{ t('login.qrSignFormTitle') }}</Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button @click="setLoginState(LoginStateEnum.REGISTER)" block>{{ t('login.signUpFormTitle') }}</Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('login.otherSignIn') }}</Divider>

    <!-- 下方图标 暂不做逻辑处理 -->
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
  import { reactive, ref, computed } from 'vue'
  import { GithubFilled, WechatFilled, AlipayCircleFilled, GoogleCircleFilled, TwitterCircleFilled } from '@ant-design/icons-vue'
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { useMessage } from '@/hooks/web/useMessage'
  import { useUserStore } from '@s/modules/user'
  import { useLoginState, LoginStateEnum, useFormRules, useFormValid } from './useLogin'
  
  const { t } = useI18n('sys')
  const { getLoginState, setLoginState } = useLoginState()
  const { login } = useUserStore()
  const { createErrorModal, notification, createConfirm } = useMessage()
  
  const FormItem = Form.Item
  const InputPassword = Input.Password
  const ARow = Row
  const ACol = Col
  const { prefixCls } = useDesign('login')
  const { getFormRules } = useFormRules()

  const rememberMe = ref(false)
  const loading = ref(false)
  const formRef = ref()
  const formData = reactive({
    account: 'phil',
    password: '123456'
  })
  const { validForm } = useFormValid(formRef)

  // 计算属性
  const getShow = computed(() => getLoginState.value === LoginStateEnum.LOGIN)

  const handleLogin = async () => {
    const data = await validForm()
    if ( !data ) return
    

    notification.success({
      message: 'success',
      description: '登录成功'
    })

    login()


    console.log('data', data);


    // createErrorModal({
    //   title: t('api.errorTip'),
    //   content: 'sss'
    // })
  }

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