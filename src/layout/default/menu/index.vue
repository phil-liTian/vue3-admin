<script lang='tsx'>
  import { useDesign } from "@h/web/useDesign";
  import { AppLogo } from "@c/Application";
  import { computed, defineComponent, unref } from "vue";
  import BasicMenu from '@c/Menu/BasicMenu.vue'
  import { useSplitMenu } from './useLayoutMenu'

  export default defineComponent({
    setup() {
      const { prefixCls } = useDesign('layout-menu')
      const { menusRef } = useSplitMenu()

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`
        ]
      })

      const getCommProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          items: menus
        }
      })

      const renderHeader = () => {
        return <AppLogo 
          class={unref(getLogoClass)} />
      }

      const renderMenu = () => {
        const { menus } = unref(getCommProps)
        return (
          <BasicMenu 
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