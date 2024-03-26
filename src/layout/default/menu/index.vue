<!--
 * @Date: 2024-03-03 12:25:59
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { useDesign } from "@h/web/useDesign";
  import { useGo } from '@h/web/usePage'
  import { useMenuSetting } from '@h/setting/useMenuSetting'
  import { AppLogo } from "@c/Application";
  import { computed, defineComponent, unref } from "vue";
  import BasicMenu from '@c/Menu/BasicMenu.vue'
  import { SimpleMenu } from '@c/SimpleMenu/index'
  import { useSplitMenu } from './useLayoutMenu'

  export default defineComponent({
    props: {
      isHorizontal: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-menu')
      const { menusRef } = useSplitMenu()
      const { go } = useGo()
      const { getAccordion, getIsHorizontal, getMenuTheme } = useMenuSetting()

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`
        ]
      })

      const handleMenuClick = (path: string) => {
        go(path)
      }

      const getCommProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          items: menus,
          onMenuClick: handleMenuClick,
          theme: unref(getMenuTheme)
        }
      })

      const renderHeader = () => {
        return <AppLogo 
          class={unref(getLogoClass)} />
      }

      const renderMenu = () => {
        const { menus, ...menuProps } = unref(getCommProps)
        return (
          // 横向菜单
          unref(getIsHorizontal) ?
            <BasicMenu 
              { ...menuProps }
              items={menus} />
            :
            <SimpleMenu { ...menuProps }  items={ menus } />
        )
      }

      return () => {
        return <>
          { renderHeader() }
          { renderMenu() }
        </>
      }
    }
  })
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-layout-menu-logo';

  .@{prefix-cls} {

    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;
    }

  }
</style>