<!--
 * @Date: 2024-03-23 12:37:48
 * @LastEditors: phil_litian
-->
<template>
  <Menu>
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu :item="item" />
    </template>
  </Menu>
</template>
  
<script lang='ts' setup>
  import { Menu as MenuType } from "@/router/types";
  import { PropType } from "vue";
  import Menu from './components/menu.vue'
  import SimpleSubMenu from './simpleSubMenu.vue'

  const props = defineProps({
    items: {
      type: Array as PropType<MenuType[]>,
      default: () => ([])
    }
  })

</script>
  
<style lang='less' scoped>
  
</style>