/*
 * @Date: 2024-04-30 14:58:26
 * @LastEditors: phil_litian
 */
import rotateDragVerify from './src/ImgRotate.vue'
import { withInstall } from '@/utils'
export { default as BasicDragVerify } from './src/DragVerify.vue'
export const RotateDragVerify = withInstall(rotateDragVerify)
export * from './src/typing'
