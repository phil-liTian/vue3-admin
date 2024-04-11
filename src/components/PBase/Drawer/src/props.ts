/*
 * @Date: 2024-03-28 11:22:40
 * @LastEditors: phil_litian
 */
import { propTypes } from '@u/propTypes'
import { PropType } from 'vue'

export const footerProps = {
  cancelText: propTypes.string,

  showCancelBtn: {
    type: Boolean,
    default: true
  },

  cancelButtonProps: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  },

  okText: propTypes.string,

  showOkBtn: {
    type: Boolean,
    default: true
  },

  okButtonProps: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  },

  okType: {
    type: String,
    default: 'primary'
  },

  // 带不带单位都可
  footerHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 60
  },
  
  showFooter: propTypes.bool.def(true)
}

export const basicProps = {
  title: propTypes.string.def(''),
  loading: propTypes.bool.def(false),
  open: propTypes.bool.def(false),
  ...footerProps
}

