<!--
 * @Date: 2024-03-23 12:37:48
 * @LastEditors: phil_litian
-->
<template>
  <Menu
    :class="prefixCls"
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
  import { PropType, reactive } from "vue";
  import { useDesign } from '@h/web/useDesign'
  import Menu from './components/menu.vue'
  import SimpleSubMenu from './simpleSubMenu.vue'
  import { MenuState } from './types'
  const { prefixCls } = useDesign('simple-menu')
  const emits = defineEmits(['menuClick'])

  const menuState = reactive<MenuState>({
    openNames: [],
    activeName: '',
    activeSubMenuNames: []
  })

  const props = defineProps({
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => ([])
    }
  })

  const handleSelect = (key) => {
    console.log('key', key);

    emits('menuClick', key)
  }


</script>
  
<style lang='less'>
  @import './index.less';
</style>