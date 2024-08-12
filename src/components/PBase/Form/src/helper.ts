import { ComponentType } from './types'


export const simpleComponents = ['Divider', 'BasicTitle']

export function isIncludeSimpleComponents(component: ComponentType ) {
  return simpleComponents.includes(component)
}
