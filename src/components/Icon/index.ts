/*
 * @Date: 2024-02-24 09:47:06
 * @LastEditors: phil_litian
 */
import SvgIcon from './src/SvgIcon.vue'
import IconPicker from './src/IconPicker.vue'
import pIcon from './Icon.vue'
import { withInstall } from '@/utils'

const PIcon = withInstall(pIcon)
const PIconPicker = withInstall(IconPicker)

export { SvgIcon, PIcon, PIconPicker }
