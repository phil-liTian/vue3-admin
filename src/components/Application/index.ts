/*
 * @Date: 2024-02-22 11:54:55
 * @LastEditors: phil_litian
 */

import { withInstall } from '@/utils'
import appLogo from './src/AppLogo.vue'
import appDarkModeToggle from './src/AppDarkModeToggle.vue'
import appLocalePicker from './src/AppLocalePicker.vue'
export { useAppProviderContext } from './src/useAppContext'

export const AppLogo = appLogo
export const AppDarkModeToggle = appDarkModeToggle
export const AppLocalePicker = appLocalePicker
