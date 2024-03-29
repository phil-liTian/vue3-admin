/*
 * @Date: 2024-03-27 21:25:11
 * @LastEditors: phil_litian
 */

import { defineComponent, unref } from "vue";
import { Divider } from 'ant-design-vue'
import { ThemeColorPicker } from './components'
import { SIDE_BAR_BG_COLOR_LIST } from '@/settings/designSetting'
import { useMenuSetting } from '@h/setting/useMenuSetting'
import { HandlerEnums } from './enums'

export default defineComponent({
 
  setup() {
    const { getMenuBgColor } = useMenuSetting()
    // siderBar的主题颜色(menu)
    function renderSideBarTheme() {
      return <ThemeColorPicker 
        colorList={SIDE_BAR_BG_COLOR_LIST} 
        checkColor={unref(getMenuBgColor)}
        event={ HandlerEnums.MENU_THEME }
      />
    }

    return () => <p-drawer>
      <Divider>1111</Divider>
      { renderSideBarTheme() }
    </p-drawer>
  }
})