/*
 * @Date: 2024-03-29 21:36:14
 * @LastEditors: phil_litian
 */
import { PropType } from 'vue'

export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '280px',
  },
};