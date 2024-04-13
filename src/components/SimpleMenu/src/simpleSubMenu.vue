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
    <!-- 折叠时展示title -->
    <div v-if="collapsedShowTitle && getIsCollapseParent" class="mt-1 collapse-title">
      {{ getI18nName }}
    </div>
    <template #title>
      <span :class="[`${prefixCls}-sub-title`, 'ml-2']">
        {{ getI18nName }}
      </span>
    </template>
  </MenuItem>

  <SubMenu 
    :name="item.path" 
    v-else>
    <template #title>
      <p-icon v-if="getIcon" :icon="getIcon" :size="16"></p-icon>
      <div class="collapse-title mt-1" v-if="collapsedShowTitle && getIsCollapseParent">{{ getI18nName }}</div>
      <span v-if="getShowSubTitle" :class="[`${prefixCls}-sub-title`, 'ml-2']">{{ getI18nName }}</span>
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
  import MenuItem from './components/MenuItem.vue';
  import SubMenu from './components/SubMenuItem.vue'
  import { Menu } from '@/router/types';
  import { propTypes } from '@/utils/propTypes';

  const { t } = useI18n()
  const { prefixCls } = useDesign('simple-menu')
  defineOptions({ name: 'SimpleSubMenu' })
  const props = defineProps({
    item: {
      type: Object as PropType<Menu>,
      default: () => {}
    },
    parent: Boolean, // 用来标识是否是一级菜单
    collapse: propTypes.bool.def(false),
    collapsedShowTitle: propTypes.bool.def(false)
  })

  const { item } = props
  
  const getShowSubTitle = computed(() => !props.collapse || !props.parent)
  // 折叠的一级菜单元素
  const getIsCollapseParent = computed(() => !!props.collapse && !!props.parent)
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