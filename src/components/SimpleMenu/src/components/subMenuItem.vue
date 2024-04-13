<!--
 * @Date: 2024-03-23 15:16:22
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass">
    <template v-if="!getCollapsed">
      <div :class="`${prefixCls}-submenu-title`" @click="handleClick" :style="getItemStyle">
        <slot name="title"></slot>

        <p-icon 
          icon="eva:arrow-ios-downward-outline" 
          :size="14"
          :class="`${prefixCls}-subMenu-title-icon`">
        </p-icon>
      </div>

      <CollapseTransition>
        <ul :class="prefixCls" v-show="state.opened">
          <slot></slot>
        </ul>
      </CollapseTransition>
    </template>
    
    <Popover 
      :overlay-class-name="`${prefixCls}-menu-popover`"
      :overlay-style="getOverlayStyle"
      :overlay-inner-style="{ padding: 0 }"
      placement="right" 
      v-else>
      <div :class="getSubClass">
        <div
          :class="[
            {
              [`${prefixCls}-submenu-popup`]: !getParentSubMenu
            }
          ]">
          <slot name="title"></slot>
        </div>
        <!-- v-if="getParentSubMenu" -->
        <!-- <PIcon
          icon="eva:arrow-ios-downward-outline">
        </PIcon> -->
      </div>

      <!-- popover展示的内容 -->
      <template #content>
        <div>
          <ul :class="[prefixCls, `${prefixCls}-${getTheme}`, `${prefixCls}-popup`]">
            <slot></slot>
          </ul>
        </div>
      </template>
    </Popover>
  </li>
</template>
  
<script lang='ts' setup>
  import { computed, getCurrentInstance, onBeforeMount, reactive, PropType, inject, provide } from 'vue'
  import { Popover } from 'ant-design-vue'
  import { CollapseTransition } from '@c/Transition/index'
  import mitt from '@/utils/mitt'
  import { useMenuItem } from './useMenu'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'
  import { propTypes } from '@/utils/propTypes'
  import { useDesign } from '@h/web/useDesign'
  import { useMenuSetting } from '@h/setting/useMenuSetting'
  import { SubMenuProvider } from './types'
  const { prefixCls } = useDesign('menu')
  defineOptions({ name: 'SubMenu' })
  const instance = getCurrentInstance()

  const { getItemStyle, getParentMenu, getParentSubMenu, getParentRootMenu } = useMenuItem(instance)
  const { getCollapsed } = useMenuSetting()
  const { rootMenuEmitter, activeName } = useSimpleRootMenuContext()
  
  const subMenuEmitter = mitt()
  
  const props = defineProps({
    name: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    collapsedShowTitle: propTypes.bool.def(false)
  })
  
  const state = reactive({
    opened: false,
    active: false
  })

  const {
    props: rootProps
  } = inject<SubMenuProvider>(`subMenu:${getParentMenu.value?.uid}`)

  const getTheme = computed(() => rootProps.theme)

  const getClass = computed(() => {
    return [
      `${prefixCls}-subMenu`,
      {
        [`${prefixCls}-opened`]: state.opened,
        [`${prefixCls}-child-item-active`]: state.active
      }
    ]
  })

  const getSubClass = computed(() => {
    return [
      `${prefixCls}-submenu-title`
    ]
  })

  const getOverlayStyle = computed(() => {
    return { minWidth: '200px' }
  })

  const handleClick = () => {
    const { opened } = state
    rootMenuEmitter.emit('opened-name-change', { name: '12', opened: false })

    state.opened = !opened
  }
 
  onBeforeMount(() => {
    rootMenuEmitter.on('on-update-opened', (data: (number | string)[]) => {
      state.opened = data.includes(props.name)
    })
  })

  provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
    props: rootProps
  })
</script>
  
<style lang='less' scoped>
  
</style>