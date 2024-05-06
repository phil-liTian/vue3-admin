/*
 * @Date: 2024-04-30 15:10:06
 * @LastEditors: phil_litian
 */
import { propTypes } from '@u/propTypes'
import { useI18n } from '@h/web/useI18n'
import { PropType } from 'vue'
const { t } = useI18n('component')

export const basicProps = {
  value: propTypes.bool,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]).def(220),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]).def(40),
  circle: propTypes.bool.def(false),
  text: propTypes.string.def(t('verify.dragText')),
  successText: propTypes.string.def(t('verify.successText')),
  wrapStyle: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  actionStyle: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  barStyle: {
    type: Object as PropType<any>,
    default: () => ({})
  }
}

export const rotateProps = {
  ...basicProps,
  src: propTypes.string,
  imgWidth: propTypes.number.def(260),
  imgWrapStyle: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  minDegree: propTypes.number.def(90),
  maxDegree: propTypes.number.def(270),
  diffDegree: propTypes.number.def(20) // 允许的误差角度
}
