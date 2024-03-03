/*
 * @Date: 2024-03-02 17:19:56
 * @LastEditors: phil_litian
 * 处理提示信息
 */
import type { ModalFuncProps } from 'ant-design-vue'
import { message as Message, Modal, notification } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { useI18n } from '@h/web/useI18n'

type IconType = 'info' | 'success' | 'error' | 'warning'
interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: IconType
}

// 除了content所有选项都是可选的
type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

// modal的基础配置
const getBaseOptions = () => {
  const { t } = useI18n()
  return {
    okText: t('common.onText'),
    centered: true
  }
}

const getIcon = (iconType: IconType) => {
  switch(iconType) {
    case 'success': {
      return <CheckCircleFilled />
    }

    case 'info':
    case 'warning': {
      return <InfoCircleFilled />
    }

    default: {
      return <CloseCircleFilled />
    }
  }
}

// 创建modal的参数
const createModalOptions = (options: ModalOptionsPartial, iconName: IconType): ModalOptionsPartial => {
  return {
    ...getBaseOptions(),
    ...options,
    // 实现自定义icon
    ...getIcon(iconName)
  }
}

// confirm
const createConfirm = (options) => {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options
  }

  return Modal.confirm(opt)
}

// error
const createErrorModal = (options: ModalOptionsPartial) => {
  return Modal.error(createModalOptions(options, 'error'))
}


// info
const createInfoModal = (options: ModalOptionsPartial) => {
  return Modal.info(createModalOptions(options, 'info'))
}

// success
const createSuccessModal = (options: ModalOptionsPartial) => {
  return Modal.success(createModalOptions(options, 'success'))
}

// warning
const createWarningModal = (options: ModalOptionsPartial) => {
  return Modal.warning(createModalOptions(options, 'warning'))
}

notification.config({
  placement: "topRight",
  duration: 3
})

export const useMessage = () => {
  return {
    createMessage: Message,
    createConfirm,
    createErrorModal,
    createInfoModal,
    createSuccessModal,
    createWarningModal,
    notification
  }
}
