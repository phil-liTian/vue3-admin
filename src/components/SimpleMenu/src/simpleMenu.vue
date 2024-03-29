<!--
 * @Date: 2024-03-23 12:37:48
 * @LastEditors: phil_litian
-->
<template>
  <Menu
    v-bind="getBindValues"
    :class="prefixCls"
    :activeName="menuState.activeName"
    :openNames="menuState.openNames"
    @select="handleSelect">
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu 
        :parent="true"
        :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
  import { Menu as MenuType } from "@/router/types";
  import { computed, PropType, reactive, useAttrs } from "vue";
  import { useDesign } from '@h/web/useDesign'
  import Menu from './components/menu.vue'
  import SimpleSubMenu from './simpleSubMenu.vue'
  import { MenuState } from './types'
  import { useOpenKeys } from './useOpenKeys'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  const { prefixCls } = useDesign('SimpleMenu')
  const attrs = useAttrs()
  const emits = defineEmits(['menuClick'])

  const props = defineProps({
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => ([])
    }
  })
  
  const menuState = reactive<MenuState>({
    openNames: [],
    activeName: '',
    activeSubMenuNames: []
  })
  const { } = useOpenKeys(menuState)

  const getBindValues = computed(() => ({ ...props, ...attrs }))

  const handleSelect = (key) => {
    emits('menuClick', key)
  }

  listenerRouteChange((route) => {
    menuState.activeName = route.path
  })

</script>
  
<style lang='less'>
  @import './index.less';
</style>