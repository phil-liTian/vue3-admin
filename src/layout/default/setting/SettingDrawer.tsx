/*
 * @Date: 2024-03-27 21:25:11
 * @LastEditors: phil_litian
 */

import { defineComponent, unref } from "vue";
import { Divider } from 'ant-design-vue'
import { ThemeColorPicker, TypePicker, SettingFooter, SwitchItem, SelectItem } from './components'
import { SIDE_BAR_BG_COLOR_LIST } from '@/settings/designSetting'
import { useMenuSetting } from '@h/setting/useMenuSetting'
import { useI18n } from '@h/web/useI18n'
import { HandlerEnums, menuTypeListEnum } from './enums'


export default defineComponent({
 
  setup(_, { attrs }) {
    const { t } = useI18n('layout')
    const { getMenuBgColor, getMenuType } = useMenuSetting()

    // 导航栏模式
    function renderSideBar() {
      return <TypePicker 
        def={unref(getMenuType)}
        menuTypeList={menuTypeListEnum}/>
    }

    // siderBar的主题颜色(menu)
    function renderSideBarTheme() {
      return <ThemeColorPicker 
        colorList={SIDE_BAR_BG_COLOR_LIST} 
        checkColor={unref(getMenuBgColor)}
        event={ HandlerEnums.MENU_THEME }
      />
    }

    // 特色功能
    function renderFeatures() {
      return <>
        <SwitchItem 
          title={t('setting.splitMenu')} />
        <SwitchItem 
          title={t('setting.closeMixSidebarOnChange')} />
        <SelectItem />
      </>
    }

    // title={t('setting.drawerTitle')}
    return () => <p-drawer { ...attrs } width={300}>
      <Divider>{() => t('setting.navMode')}</Divider>
      {renderSideBar()}
      <Divider>{() => t('setting.sidebarTheme')}</Divider>
      { renderSideBarTheme() }
      { renderFeatures() }
      <SettingFooter />
    </p-drawer>
  }
})