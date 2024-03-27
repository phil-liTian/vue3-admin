<!--
 * @Date: 2024-03-23 15:16:22
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass">
    <div :class="`${prefixCls}-submenu-title`" @click="handleClick" :style="getItemStyle">
      <slot name="title"></slot>

      <p-icon icon="eva:arrow-ios-downward-outline" :class="`${prefixCls}-subMenu-title-icon`"></p-icon>
    </div>

    <CollapseTransition>
      <ul :class="prefixCls" v-show="state.opened">
        <slot></slot>
      </ul>
    </CollapseTransition>
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, getCurrentInstance, onBeforeMount, reactive } from 'vue'
  import { CollapseTransition } from '@c/Transition/index'
  import mitt from '@/utils/mitt'
  import { useMenuItem } from './useMenu'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'
  const { prefixCls } = useDesign('menu')
  defineOptions({ name: 'SubMenu' })
  const instance = getCurrentInstance()

  const { getItemStyle } = useMenuItem(instance)
  const { rootMenuEmitter } = useSimpleRootMenuContext()
  const subMenuEmitter = mitt()

  const state = reactive({
    opened: false
  })

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}-opened`]: state.opened
      }
    ]
  })

  const handleClick = () => {
    const { opened } = state
    rootMenuEmitter.emit('opened-name-change', { name: '12', opened: false })

    state.opened = !opened
  }


  onBeforeMount(() => {
    rootMenuEmitter.on('on-update-opened', a => {
      console.log('a', a);
    })
  })
</script>
  
<style lang='less' scoped>
  
</style>