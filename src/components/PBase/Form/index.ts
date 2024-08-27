/*
 * @Date: 2024-04-12 16:23:54
 * @LastEditors: phil_litian
 */

import { withInstall } from '@/utils'
import BasicForm from './src/BasicForm.vue'
export * from './src/types/form'
export { useForm } from './src/hooks/useForm'

export const PBasicForm = withInstall(BasicForm)
