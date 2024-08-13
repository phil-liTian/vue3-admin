<!--
 * @Date: 2024-03-23 12:49:33
 * @LastEditors: phil_litian
-->
<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>
  
<script lang='ts' setup>
  import { computed, onMounted, PropType, ref, toRef, watch, watchEffect, provide, getCurrentInstance } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@u/propTypes'
  import mitt from '@u/mitt'
  import { type MenuEmitterEvent, createSimpleRootMenuContext } from './useSimpleMenuContext'
  import { nextTick } from 'vue'
  import { SubMenuProvider } from './types'
  const { prefixCls } = useDesign('menu')
  const instance = getCurrentInstance()
  defineOptions({ name: 'Menu' })
  
  const currentActiveName = ref<number | string>('')
  const rootMenuEmitter = mitt<MenuEmitterEvent>()
  const props = defineProps({
    theme: propTypes.oneOf(['light', 'dark']).def('light'),
    collapse: propTypes.bool.def(true),
    indentSize: propTypes.number.def(16),
    activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
    openNames: {
      type: Array as PropType<(string | number)[]>,
      default: []
    }
  })

  const openedNames = ref<(string | number)[]>([])

  createSimpleRootMenuContext({
    rootMenuEmitter,
    activeName: currentActiveName
  })

  provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
    props: props as any
  })

  const emits = defineEmits(['select'])

  const onUpdateOpen = () => {
    rootMenuEmitter.emit('on-update-opened', openedNames.value )
  }

  const getClass = computed(() => {
    const { theme, collapse } = props
    return [
      prefixCls,
      `${prefixCls}-vertical`,
      `${prefixCls}-${theme}`,
      {
        [`${prefixCls}-collapse`]: collapse
      }
    ]
  }) 

  watchEffect(() => {
    if ( props.activeName ) {
      currentActiveName.value = props.activeName
    }
  })

  watchEffect(() => {
    openedNames.value = props.openNames
  })

  watch(() => props.openNames, () => {
    nextTick(() => { 
      onUpdateOpen()
    })
  })

  onMounted(() => {
    openedNames.value = props.openNames;
    // onUpdateOpen()
    rootMenuEmitter.on('on-menu-item-select', (name: string | number) => {
      // go(name)
      emits('select', name)
    })

    rootMenuEmitter.on('open-name-change', ({ name, opened }) => {
      const isExistIndex = openedNames.value.findIndex(v => v === name)
      if ( opened && isExistIndex === -1 ) {
        // 打开
        openedNames.value.push(name)
      } else if ( isExistIndex !== -1 ) {
        // 关闭
        openedNames.value.splice(isExistIndex, 1)
      }
    })
  })
</script>
  
<style lang='less'>
  @import './menu.less';
</style>