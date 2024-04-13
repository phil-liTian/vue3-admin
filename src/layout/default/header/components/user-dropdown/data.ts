/*
 * @Date: 2024-04-12 15:28:57
 * @LastEditors: phil_litian
 */
import { DropMenu } from "@/components/DropDown/src/types";
import { useI18n } from '@h/web/useI18n'

const { t } = useI18n('layout')
export const userDropdownMenuList: DropMenu[] = [
  { text: t('header.tooltipLock'), key: 'lock', event: '' },
  { text: t('header.dropdownItemLoginOut'), key: 'logout', event: '' }
]
