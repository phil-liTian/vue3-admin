/*
 * @Date: 2024-03-28 11:22:40
 * @LastEditors: phil_litian
 */
import { propTypes } from '@u/propTypes'
import { PropType } from 'vue'

export const basicProps = {
  title: propTypes.string.def('') 
}


export const footerProps = {
  footerHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 60
  },
  
}
