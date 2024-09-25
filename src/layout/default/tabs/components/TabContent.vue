<!--
 * @Date: 2024-04-02 19:22:26
 * @LastEditors: phil_litian
-->
<template>
  <PDropdown 
    :trigger="getTrigger"
    :dropMenuList="getDropMenuList"
    @menuEvent="handleMenuEvent">
    <div v-if="getIsTabs">
      <span class="ml-1 font-size-12px">{{ getTitle }}</span>
    </div>
    <span v-else :class="`${prefixCls}__extra-quick`">
      <p-icon icon="mdi:chevron-down"></p-icon>
    </span>
  </PDropdown>
</template>
  
<script lang='ts' setup>
  import { computed, PropType, unref } from 'vue'
  import { RouteLocationNormalized } from 'vue-router'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { useTabDropdown } from '../useTabDropdown'
  import { propTypes } from '@u/propTypes'
  defineOptions({ name: 'TabContent' })
  const props = defineProps({
    isExtra: propTypes.bool.def(false), // 标识是否是tab的extra部分
    tabItem: {
      type: Object as PropType<RouteLocationNormalized>,
      default: null
    }
  })

  const { prefixCls } = useDesign('multiple-tabs-content')
  const { getDropMenuList, handleMenuEvent } = useTabDropdown()
  const { t } = useI18n()

  const getIsTabs = computed(() => !props.isExtra)
  const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] => {
    return unref(getIsTabs) ? ['contextmenu'] : ['click']
  })

  const getTitle = computed(() => {
    const { meta: { title } } = props.tabItem
    return t(title)
  })

</script>
  
<style lang='less' scoped>
  
</style>