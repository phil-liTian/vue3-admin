/*
 * @Date: 2024-03-26 09:50:25
 * @LastEditors: phil_litian
 * 当前方法对vue-types的方法进行拓展 style 和 VNodeChild
 */
import {  } from 'vue'
import { createTypes, VueTypesInterface, VueTypeValidableDef } from 'vue-types'

type PropTypes = VueTypesInterface & {

}

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes


class propTypes extends newPropTypes {
  
}

export { propTypes }