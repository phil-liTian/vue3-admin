<!--
 * @Date: 2024-03-23 12:55:27
 * @LastEditors: phil_litian
-->
<template>
  <MenuItem 
    v-if="!hasChildren"
    :class="getLevelClass"
    :name="item.path">
    <p-icon v-if="getIcon" :icon="getIcon" :size="16"></p-icon>
    <template #title>
      <span :class="[`${prefixCls}-sub-title`, 'ml-2']">
        {{ getI18nName }}
      </span>
    </template>
  </MenuItem>

  <SubMenu :name="item.path" v-else>
    <template #title>
      <p-icon v-if="getIcon" :icon="getIcon" :size="16"></p-icon>
      <span :class="[`${prefixCls}-sub-title`, 'ml-2']">{{ getI18nName }}</span>
    </template>

    <template v-for="childItem in item.children || []" :key="childItem.key">
      <simpleSubMenu :parent="false" :item="childItem"></simpleSubMenu>
    </template>
  </SubMenu>
</template>
  
<script lang='ts' setup>
  import { PropType, computed } from 'vue';
  import { useI18n } from '@h/web/useI18n'
  import { useDesign } from '@h/web/useDesign'
  import MenuItem from './components/menuItem.vue';
  import SubMenu from './components/subMenuItem.vue'
  import { Menu } from '@/router/types';
  import { propTypes } from '@/utils/propTypes';

  const { t } = useI18n()
  const { prefixCls } = useDesign('simple-menu')
  defineOptions({ name: 'simpleSubMenu' })
  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {}
    },
    parent: Boolean,
    collapse: propTypes.bool.def(false)
  })

  const { item } = props
  
  const getShowSubTitle = computed(() => !props.collapse)
  const getI18nName = computed(() => t(item.name))

  const getIcon = computed(() => props.item.icon )

  const hasChildren = computed(() => {
    return item.children?.length
  })

  const getLevelClass = computed(() => {
    return [
      {
        [`${prefixCls}__parent`]: props.parent,
        [`${prefixCls}__children`]: !props.parent,
      }
    ]
  })

</script>