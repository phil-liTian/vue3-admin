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
import { useTransitionSetting } from '@h/setting/useTransitionSetting'
import { HandlerEnums, menuTypeListEnum, routerTransitionOptions } from './enums'
import { contentDataList, transitionDataList, featureDataList } from './data'
const { getBasicTransition } = useTransitionSetting()

// {/* 展示面包屑 */}
// <SwitchItem
// def={unref(getShowBreadcrumb)}
// event={HandlerEnums.SHOW_BREADCRUMB}
// title={t('setting.breadcrumb')}
// />
// {/* 展示面包屑的icon */}
// <SwitchItem 
// def={unref(getShowBreadcrumbIcon)}
// title={t('setting.breadcrumbIcon')}
// event={HandlerEnums.SHOW_BREADCRUMB_ICON}
// />
// {/* 展示标签页 */}
// <SwitchItem 
// def={unref(getShowMultipleTab)} 
// title={t('setting.tabs')} 
// event={HandlerEnums.TABS_SHOW} />
// {/* 刷新 */}
// <SwitchItem 
// def={unref(getShowRedo)}
// title={t('setting.tabsRedoBtn')}
// event={HandlerEnums.TABS_SHOW_REDO}
// />
// {/* 标签页快捷按钮 */}
// <SwitchItem 
// def={unref(getShowQuick)}
// title={t('setting.tabsQuickBtn')}
// event={HandlerEnums.TABS_SHOW_QUICK}
// />

// {/* 标签页折叠按钮 */}
// <SwitchItem 
// def={unref(getShowFold)}
// title={t('setting.tabsFoldBtn')}
// event={HandlerEnums.TABS_SHOW_FOLD}
// />
export default defineComponent({
  setup(_, { attrs }) {
    const { t } = useI18n('layout')
    const { getMenuBgColor, getMenuType, getCollapsed } = useMenuSetting()

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

    // 界面功能
    function renderFeatures() {
      return <>
        {
          featureDataList.map(item => (
            <SwitchItem 
              title={t(item.title)}
              event={item.event} 
              def={unref(item.value)}
            />
          ))
        }
      </>
    }

    // 界面内容
    function renderContent() {
      return <>
        {
          contentDataList.map(item => (
            <SwitchItem
              def={unref(item.value)}
              event={item.event}
              title={t(item.title)}
            />
          ))
        }
      </>
    }

    // 动画
    function renderTransition() {
      return <>
        {
          transitionDataList.map(item => {
            <SwitchItem 
              title={t(item.title)}
              event={item.event}
              def={unref(item.value)}
            />
          })
        }
        {/* 选择动画 */}
        <SelectItem
          def={unref(getBasicTransition)}
          dataList={routerTransitionOptions}
          title={t('setting.animationType')} />
      </>
    }

    return () => <p-drawer 
      { ...attrs } 
      title={t('setting.drawerTitle')}
      width={330} 
      class='setting-drawer'>
      <Divider>{() => t('setting.navMode')}</Divider>
      {renderSideBar()}
      <Divider>{() => t('setting.sidebarTheme')}</Divider>
      { renderSideBarTheme() }
      <Divider>{() => t('setting.interfaceFunction')}</Divider>
      { renderFeatures() }
      <Divider>{() => t('setting.interfaceDisplay')}</Divider>
      { renderContent() }
      <Divider>{() => t('setting.animation')}</Divider>
      { renderTransition() } 
      <SettingFooter />
    </p-drawer>
  }
})