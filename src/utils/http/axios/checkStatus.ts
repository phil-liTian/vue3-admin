/*
 * @Date: 2024-03-15 17:40:13
 * @LastEditors: phil_litian
 */

import { ErrorMessageMode } from "#/axios";
import { useI18n } from '@h/web/useI18n'
import { useMessage } from '@h/web/useMessage'

/**
 * @description: 校验状态
 * @param status 网络请求状态
 * @param msg 此处可能存在后端抛出的异常信息
 * @param errorMessageMode 异常抛出模式 message | modal
 */
export const checkStatus = (status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message' ) => {
  const { t } = useI18n('sys')
  const { createErrorModal, createMessage } = useMessage()
  const error = createMessage.error;
  let errMessage = ''
  switch (status) {
    case 404: {
      errMessage = t('sys.api.errMsg404')
      break
    }

  }

  console.log('errMessage', errMessage);

  if ( errMessage ) {
    if ( errorMessageMode === 'message' ) {
      error({ content: errMessage })
    } else if (errorMessageMode === 'modal') {
      createErrorModal({ content: errMessage })
    }
  }
}
