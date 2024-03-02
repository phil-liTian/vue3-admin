/*
 * @Date: 2024-03-02 09:22:03
 * @LastEditors: phil_litian
 */

import { computed, ref } from "vue"

export enum LoginStateEnum {
  LOGIN
}

let currentState = ref(LoginStateEnum.LOGIN)

export const useLoginState = () => {

  // 设置当前登录状态
  const setLoginState = ( state: LoginStateEnum ) => {
    currentState.value = state
  }

  // 获取当前登录状态
  const getLoginState = computed(() => currentState.value)

  return {
    setLoginState,
    getLoginState
  }
}