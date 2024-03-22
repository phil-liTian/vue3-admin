<!--
 * @Date: 2024-03-03 12:25:59
 * @LastEditors: phil_litian
-->
<script lang='tsx'>
  import { useDesign } from "@h/web/useDesign";
  import { useGo } from '@h/web/usePage'
  import { AppLogo } from "@c/Application";
  import { computed, defineComponent, unref } from "vue";
  import BasicMenu from '@c/Menu/BasicMenu.vue'
  import { useSplitMenu } from './useLayoutMenu'

  export default defineComponent({
    setup() {
      const { prefixCls } = useDesign('layout-menu')
      const { menusRef } = useSplitMenu()
      const { go } = useGo()

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`
        ]
      })

      const handleMenuClick = (path: string) => {
        console.log('path-->', path);
        go(path)
      }


      const getCommProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          items: menus,
          onMenuClick: handleMenuClick
        }
      })

      const renderHeader = () => {
        return <AppLogo 
          class={unref(getLogoClass)} />
      }

      const renderMenu = () => {
        const { menus, ...menuProps } = unref(getCommProps)
        return (
          <BasicMenu 
            { ...menuProps }
            items={menus} />
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