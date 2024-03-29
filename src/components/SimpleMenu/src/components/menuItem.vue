<!--
 * @Date: 2024-03-23 12:56:16
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass" @click.stop="handleClickItem" :style="getItemStyle">
    <slot></slot>
    <slot name=title></slot>
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, getCurrentInstance, PropType, watch, ref, unref } from 'vue'
  import { propTypes } from '@u/propTypes'
  import { useMenuItem } from './useMenu'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'

  const props = defineProps({
    name: {
      type: [String, Number] as PropType<number | string>,
      required: true
    }
  })
  const active = ref(false)

  const instance = getCurrentInstance()
  const { prefixCls } = useDesign('menu')
  const { getItemStyle } = useMenuItem(instance)
  const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()

  // 获取class
  const getClass = computed(() => {
    return [
      `${prefixCls}-item`,
      {
        [`${prefixCls}-item-active`]: unref(active)
      }
    ]
  })

  const handleClickItem = () => {
    rootMenuEmitter.emit('on-menu-item-select', props.name)
  }
  
  watch(() => activeName.value, (path: string | number) => {
    if ( path === props.name ) {
      active.value = true
    } else {
      active.value = false
    }
  }, { immediate: true })

</script>
  
<style lang='less' scoped>
  
</style>