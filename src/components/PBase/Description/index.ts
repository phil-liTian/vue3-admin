/*
 * @Date: 2024-04-07 10:18:46
 * @LastEditors: phil_litian
 */
import { withInstall } from '@u/index'
import Description from './src/Description.vue'
export { useDescription } from './src/useDescription'
export * from './src/typing'

export const PDescription = withInstall(Description)
