<!--
 * @Date: 2024-03-23 12:56:16
 * @LastEditors: phil_litian
-->
<template>
  <li :class="getClass" @click.stop="handleClickItem" :style="getCollapsed ? {} : getItemStyle">

    <Tooltip placement="right" v-if="showToolTip">
      <!-- 折叠时menuItem的title做tooltips -->
      <template #title>
        <slot name="title"></slot>
      </template>

      <div>
        <slot></slot>
      </div>
    </Tooltip>

    <template v-else>

      <slot></slot>
      <slot name='title'></slot>
    </template>
    
  </li>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, getCurrentInstance, PropType, watch, ref, unref } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { propTypes } from '@u/propTypes'
  import { useMenuSetting } from '@h/setting/useMenuSetting'
  import { useMenuItem } from './useMenu'
  import { useSimpleRootMenuContext } from './useSimpleMenuContext'
  import { useSlots } from 'vue'
  defineOptions({ name: 'MenuItem' })
  const props = defineProps({
    name: {
      type: [String, Number] as PropType<number | string>,
      required: true
    }
  })
  const active = ref(false)

  const instance = getCurrentInstance()
  const slots = useSlots()
  const { prefixCls } = useDesign('menu')
  const { getItemStyle, getParentMenu } = useMenuItem(instance)
  const { getCollapsed } = useMenuSetting()
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
  
  const showToolTip = computed(() => unref(getParentMenu).type.name === 'Menu' &&  unref(getCollapsed) && slots.title)

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