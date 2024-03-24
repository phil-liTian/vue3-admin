<!--
 * @Date: 2024-03-23 12:55:27
 * @LastEditors: phil_litian
-->
<template>
  <MenuItem v-if="!hasChildren">
    <template #title>
      {{ getI18nName }}
    </template>
  </MenuItem>

  <SubMenu v-else>
    <template v-for="childItem in item.children || []" :key="childItem.key">
      <simpleSubMenu :item="childItem"></simpleSubMenu>
    </template>
  </SubMenu>
</template>
  
<script lang='ts' setup>
  import { PropType, computed } from 'vue';
  import { useI18n } from '@h/web/useI18n'
  import MenuItem from './components/menuItem.vue';
  import SubMenu from './components/subMenuItem.vue'
  import { Menu } from '@/router/types';

  const { t } = useI18n()
  defineOptions({ name: 'simpleSubMenu' })
  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {}
    }
  })

  const { item } = props
  
  const getI18nName = computed(() => t(item.name))

  const hasChildren = computed(() => {
    return item.children?.length
  })


</script>
  
<style lang='less' scoped>
  
</style>