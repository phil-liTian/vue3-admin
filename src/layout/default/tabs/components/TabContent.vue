<!--
 * @Date: 2024-04-02 19:22:26
 * @LastEditors: phil_litian
-->
<template>
  <PDropdown :dropMenuList="getDropMenuList">
    <p-icon icon="mdi:chevron-down"></p-icon>
  </PDropdown>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { useTabDropdown } from '../useTabDropdown'
  import { propTypes } from '@u/propTypes'
  import { computed, unref } from 'vue'
  defineOptions({ name: 'TabContent' })
  const props = defineProps({
    isExtra: propTypes.bool.def(false) // 标识是否是tab的extra部分
  })

  const { prefixCls } = useDesign('multiple-tab-content')
  const { getDropMenuList } = useTabDropdown()

  const getIsTabs = computed(() => !props.isExtra)
  const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] => {
    return unref(getIsTabs) ? ['contextmenu'] : ['click']
  })


</script>
  
<style lang='less' scoped>
  
</style>