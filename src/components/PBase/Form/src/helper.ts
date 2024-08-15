import { ComponentType } from './types'
import { useI18n } from '@h/web/useI18n'

export const simpleComponents = ['Divider', 'BasicTitle']

export function isIncludeSimpleComponents(component: ComponentType ) {
  return simpleComponents.includes(component)
}

export function createPlaceholderMessage(component: ComponentType) {
  const { t } = useI18n()

  if ( component.includes('Input') ) {
    return t('common.inputText')
  }

  if ( component.includes('Select') || component.includes('Picker') ) {
    return t('common.chooseText')
  }
}
