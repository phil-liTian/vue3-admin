import { computed } from "vue";
import { useI18n } from '@h/web/useI18n'

export function useUploadType(props) {
  const getHelpText = computed(() => {
    const { t } = useI18n('component.upload')
    const { accept, maxNumber, maxSize, helpText } = props
    if ( helpText ) {
      return helpText
    }

    let helpTexts: string[] = []
    
    if ( accept?.length ) {
      helpTexts.push(t('accept', [accept.join(', ')]))
    }

    if ( maxSize ) {
      helpTexts.push(t('maxSize', [ maxSize ]))
    }

    if ( maxNumber ) {
      helpTexts.push(t('maxNumber', [ maxNumber ]))
    }

    return helpTexts.join('; ')
  })

  return {
    getHelpText
  }
}
