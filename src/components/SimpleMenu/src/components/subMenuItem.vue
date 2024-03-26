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
      <ul :class="prefixCls" v-show="state.open">
        <slot></slot>
      </ul>
    </CollapseTransition>
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, getCurrentInstance, reactive } from 'vue'
  import { CollapseTransition } from '@c/Transition/index'
  import { useMenuItem } from './useMenu'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'
  const { prefixCls } = useDesign('menu')
  defineOptions({ name: 'SubMenu' })
  const instance = getCurrentInstance()

  const { getItemStyle } = useMenuItem(instance)
  const { rootMenuEmitter } = useSimpleRootMenuContext()

  const state = reactive({
    open: false
  })

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}-opened`]: state.open
      }
    ]
  })

  const handleClick = () => {
    const { open } = state
    rootMenuEmitter.emit('open-name-change', { name: '12', opened: false })

    state.open = !open
  }
</script>
  
<style lang='less' scoped>
  
</style>