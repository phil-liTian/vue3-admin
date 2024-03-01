/*
 * @Date: 2024-02-28 16:41:13
 * @LastEditors: phil_litian
 */

const validColors = ['primary', 'error', 'warning', 'success', ''] as const

export default {
  preIcon: { type: String },

  sufIcon: { type: String },

  disabled: { type: Boolean },

  color: {
    type: String,
    validator: v => validColors.includes(v),
    default: ''
  },
    
}
