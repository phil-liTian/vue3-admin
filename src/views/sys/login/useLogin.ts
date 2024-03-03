/*
 * @Date: 2024-03-02 09:22:03
 * @LastEditors: phil_litian
 */

import { Ref, computed, ref, unref } from "vue"
import { useI18n } from '@h/web/useI18n'
import type { FormInstance } from 'ant-design-vue'

export enum LoginStateEnum {
  LOGIN,
  MOBILE,
  REGISTER,
  QR_CODE,
  RESET_PASSWORD
}

let currentState = ref(LoginStateEnum.LOGIN)

export const useLoginState = () => {

  // 返回登录状态
  const backLoginState = () => {
    currentState.value = LoginStateEnum.LOGIN
  }

  // 设置当前登录状态
  const setLoginState = ( state: LoginStateEnum ) => {
    currentState.value = state
  }

  // 获取当前登录状态
  const getLoginState = computed(() => currentState.value)

  return {
    backLoginState,
    setLoginState,
    getLoginState
  }
}

// form表单校验
export const useFormValid = (formRef?: Ref<FormInstance>) => {
  
  const validate = computed(() => {
    
  })

  // 校验是否符合要求
  const validForm = async () => { 
    const form = unref(formRef)
    if( !form ) return
    const data = await form.validate()
    return data
  }

  return {
    validForm,
    validate
  }

}

// form表单规则
export const useFormRules = (formData?: Recordable) => {
  const { t } = useI18n('sys')
  // 账号的规则
  const getAccountFormRule = createRule(t('login.accountPlaceholder'))
  // 密码的规则
  const getPasswordFormRule = createRule(t('login.passwordPlaceholder'))

  const getFormRules = computed((): any => {
    switch(unref(currentState)) {
      case LoginStateEnum.MOBILE: {
        
      }

      case LoginStateEnum.REGISTER: {

      }

      case LoginStateEnum.RESET_PASSWORD: {

      }
  
      default: {
        return {
          account: getAccountFormRule,
          password: getPasswordFormRule
        }
      }
    }
  })

  return {
    getFormRules
  }
}

const createRule = (message: string) => {
  return {
    required: true,
    trigger: 'change',
    message
  }
}