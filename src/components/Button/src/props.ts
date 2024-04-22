/*
 * @Date: 2024-02-28 16:41:13
 * @LastEditors: phil_litian
 */

import { propTypes } from "@/utils/propTypes"

const validColors = ['primary', 'error', 'warning', 'success', ''] as const

export default {
  loading: propTypes.bool.def(false),
  preIcon: { type: String },

  sufIcon: { type: String },

  disabled: { type: Boolean },
  
  iconSize: {
    type: Number,
    default: 14,
  },

  color: {
    type: String,
    validator: v => validColors.includes(v),
    default: ''
  },
    
}
