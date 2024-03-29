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
  import { computed, onMounted, PropType, ref } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import { useGo } from '@h/web/usePage'
  import { propTypes } from '@u/propTypes'
  import mitt from '@u/mitt'
  import { type MenuEmitterEvent, createSimpleRootMenuContext } from './useSimpleMenuContext'
  const { prefixCls } = useDesign('menu')
  const { go } = useGo()

  defineOptions({ name: 'Menu' })
  const currentActiveName = ref('')
  const rootMenuEmitter = mitt<MenuEmitterEvent>()
  const props = defineProps({
    theme: propTypes.oneOf(['light', 'dark']).def('light'),
    collapse: propTypes.bool.def(true),
    indentSize: propTypes.number.def(16),
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

  const emits = defineEmits(['select'])

  const onUpdateOpen = () => {
    rootMenuEmitter.emit('on-update-opened', )
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

  onMounted(() => {
    openedNames.value = props.openNames;
    rootMenuEmitter.on('on-menu-item-select', (name: string | number) => {
      console.log('on-menu-item-select', name);

      // go(name)
      emits('select', name)
    })

    rootMenuEmitter.on('open-name-change', ({ name, opened }) => {
      console.log('open-name-change', name, opened);
    })
  })
</script>
  
<style lang='less'>
  @import './menu.less';
</style>