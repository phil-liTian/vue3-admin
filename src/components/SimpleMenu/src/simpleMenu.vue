<!--
 * @Date: 2024-03-23 12:37:48
 * @LastEditors: phil_litian
-->
<template>
  <Menu
    v-bind="getBindValues"
    :class="prefixCls"
    :activeName="menuState.activeName"
    :openNames="getOpenKeys"
    @select="handleSelect">
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu 
        :parent="true"
        :collapse="collapse"
        :collapsedShowTitle="collapsedShowTitle"
        :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
  import { Menu as MenuType } from "@/router/types";
  import { computed, PropType, reactive, useAttrs, watch } from "vue";
  import { useRouter } from 'vue-router'
  import { useDesign } from '@h/web/useDesign'
  import Menu from './components/menu.vue'
  import SimpleSubMenu from './simpleSubMenu.vue'
  import { MenuState } from './types'
  import { useOpenKeys } from './useOpenKeys'
  import { listenerRouteChange } from '@/logics/mitt/routeChange'
  import { propTypes } from "@/utils/propTypes";
  import { toRefs } from "vue";
  const { prefixCls } = useDesign('SimpleMenu')
  const attrs = useAttrs()
  const { currentRoute } = useRouter()
  const emits = defineEmits(['menuClick'])

  const props = defineProps({
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => ([])
    },
    accordion: propTypes.bool.def(true),
    collapse: propTypes.bool.def(false), // 是否折叠
    collapsedShowTitle: propTypes.bool.def(false), // 折叠时是否展示title
  })
  
  const menuState = reactive<MenuState>({
    openNames: [],
    activeName: '',
    activeSubMenuNames: []
  })

  // 转换成ref类型
  const { items, accordion } = toRefs(props)
  const { getOpenKeys, setOpenKeys } = useOpenKeys(menuState, items, accordion)

  const getBindValues = computed(() => ({ ...props, ...attrs }))

  const handleSelect = (key) => {
    emits('menuClick', key)
  }

  listenerRouteChange((route) => {
    menuState.activeName = route.path
    setOpenKeys(route.path)
  })

  // 侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明 flush: 'post'
  watch(() => props.items, () => {
    setOpenKeys(currentRoute.value.path)
  }, { flush: 'post' })

</script>
  
<style lang='less'>
  @import './index.less';
</style>