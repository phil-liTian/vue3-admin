/*
 * @Date: 2024-06-04 17:49:01
 * @LastEditors: phil_litian
 */
import { h, defineComponent } from 'vue'
import { Popover } from 'ant-design-vue'
import { componentMap } from '@c/PBase/Table/index'
import { ComponentType } from '../../types/componentType'
interface ComponentProps {
  component?: ComponentType;
  rule?: boolean;
  ruleMessage?: string;
  popoverVisible?: boolean
}

export function CellComponent(
  { 
    component = 'Input', 
    rule = true,
    popoverVisible,
    ruleMessage
  }: ComponentProps, 
  { attrs }) {
    
  const Comp = componentMap.get(component) as typeof defineComponent
  const DefaultComp = h(Comp, attrs)
  
  if ( !rule ) {
    return DefaultComp
  }
  return h(
    Popover, 
    {
      overlayClassName: 'edit-cell-rule-popover',
      open: !!popoverVisible,
      // getPopupContainer
    },
    {
      default: () => DefaultComp,
      content: () => ruleMessage
    }
  )
}
