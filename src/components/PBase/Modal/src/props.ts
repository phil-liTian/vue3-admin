/*
 * @Date: 2024-04-12 16:50:06
 * @LastEditors: phil_litian
 */

import { propTypes } from '@u/propTypes'
import { ButtonProps } from 'ant-design-vue'
import { PropType } from 'vue'

export const modalProps = {
  open: propTypes.bool.def(false),
  cancelText: propTypes.string.def(''),
  okText: propTypes.string.def(''),
  onType: propTypes.string.def('primary'),
  wrapClassName: propTypes.string.def(''),
  draggable: propTypes.bool.def(true),
  destroyOnClose: propTypes.bool.def(false)
}

export const basicProps = Object.assign({}, modalProps, {
  canFullScreen: propTypes.bool.def(true),
  title: propTypes.string,
  helpMessage: [String, Array] as PropType<string | string[]>,
  showCancelBtn: propTypes.bool.def(true),
  confirmLoading: propTypes.bool.def(false),
  showOkBtn: propTypes.bool.def(true),
  okButtonProps: Object,
  cancelButtonProps: Object,
  loading: propTypes.bool.def(false),
  loadingTip: propTypes.string.def(''),
  width: propTypes.number.def(520)
})
