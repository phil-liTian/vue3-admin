/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */

import { withInstall } from '@/utils'
import basicButton from './src/BasicButton.vue'
import popconfirmButton from './src/PopConfirmButton.vue'
import buttonProps from './src/props'

export const PButton = withInstall(basicButton)
export const PPopConfirmButton = withInstall(popconfirmButton)
export type ButtonProps = Partial<typeof buttonProps>
