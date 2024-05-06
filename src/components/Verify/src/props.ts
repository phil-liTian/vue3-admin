/*
 * @Date: 2024-04-30 15:10:06
 * @LastEditors: phil_litian
 */
import { propTypes } from '@u/propTypes'
import { useI18n } from '@h/web/useI18n'
const { t } = useI18n('component')
export default {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]).def(220),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]).def(40),
  circle: propTypes.bool.def(false),
  text: propTypes.string.def(t('verify.dragText')),
  successText: propTypes.string.def(t('verify.successText'))
}