<!--
 * @Date: 2024-03-28 10:32:17
 * @LastEditors: phil_litian
-->
<template>
  <Drawer
    v-bind="getBindValues"
    :class="prefixCls"
    @close="onClose">
    <template #title v-if="!$slots.title">
      <DrawerHeader 
        :isDetail="isDetail"
        @close="onClose"
        :title="title">
        <template #titleToolbar>
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>

    <template v-else #title>
      {{ title }}
    </template>

    <!-- v-loading="getLoading" -->

    <pScrollContainer 
      :style="getScrollContainerStyle">
      <slot></slot>

    </pScrollContainer>
    
    <DrawerFooter v-bind="getMergeProps">
      <!-- 可以利用Object.keys(slots)来循环实现具名插槽 -->
      <!-- {{ Object.keys(slots) }} -->
      <template #[item] v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item"></slot>
      </template>
    </DrawerFooter>
  </Drawer>
</template>
  
<script lang='ts' setup>
  import { Drawer } from 'ant-design-vue'
  import { Ref, ref, computed, CSSProperties, unref, useAttrs, useSlots, watch, getCurrentInstance } from 'vue'
  import { useDesign } from '@h/web/useDesign'
  import DrawerFooter from "./components/DrawerFooter.vue"
  import DrawerHeader from "./components/DrawerHeader.vue"
  import { basicProps } from './props'
  import { DrawerProps } from './typing'
  import { deepMerge } from '@/utils'
  import { isNumber } from '@/utils/is'
  defineOptions({ name: 'PDrawer' })
  const props = defineProps(basicProps)
  const emits = defineEmits(['register'])
  const openRef = ref(false)
  const propsRef = ref({}) as Ref<Partial<DrawerProps>>
  const { prefixCls, prefixVar } = useDesign('basic-drawer')
  const attrs = useAttrs()
  const slots = useSlots()
  const instance = getCurrentInstance()

  const drawerInstance = {
    setDrawerProps,
  }

  // 组件注册时 就触发当前方法
  instance && emits('register', drawerInstance, instance.uid)

  const getMergeProps = computed(() => {
    return deepMerge(props, unref(propsRef))
  })

  const getProps = computed(() => {
    const opt = {
      ...unref(getMergeProps),
      open: unref(openRef)
    }
    // 自定义title属性
    opt.title = undefined
    
    const { isDetail, width, wrapClassName, getContainer } = opt
    if(isDetail) {
      if(!width) {
        opt.width = '100%'
      }

      const detailCls = `${prefixCls}__detail`
      opt.rootClassName = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls
      
      if ( !getContainer ) {
        opt.getContainer = `.${prefixVar}-layout-content`
      }
    }

    if ( !opt.getContainer ) {
      opt.getContainer = 'body'
    }

    return opt
  })

  const getLoading = computed(() => {
    return !!unref(getProps)?.loading
  })

  // footer高度
  const getFooterHeight = computed(() => {
    const { footerHeight, showFooter } = unref(getProps)
    if ( showFooter && footerHeight ) {
      return `${isNumber(footerHeight) ? `${footerHeight}` : footerHeight.replace('px', '')}px`
    }
    return '0px'
  })

  // 滚动区域高度
  const getScrollContainerStyle = computed((): CSSProperties => {
    const footerHeight = unref(getFooterHeight)
    return {
      position: 'relative',
      height: `calc(100% - ${footerHeight})`
    }
  })

  // 实际绑定的元素
  const getBindValues = computed(() => {
    return {
      ...attrs,
      ...unref(getProps)
    }
  })

  const onClose = () => {
    openRef.value = false
  }

  // 设置当前drawer的属性
  function setDrawerProps(props: Partial<DrawerProps>) {
    propsRef.value = deepMerge(unref(propsRef), props)

    if( Reflect.has(props, 'open') ) {
      openRef.value = !!props.open
    }
  }

  // 监听传进来的open属性
  watch(() => props.open, (val, olVal) => {
    if ( val !== olVal ) {
      openRef.value = val
    }
  }, { immediate: true })


</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-drawer';
  @prefix-cls-detail: ~'@{namespace}-basic-drawer__detail';
  @header-height: 60px;


  .@{prefix-cls} {
    .ant-drawer-body {
      height: calc(100% - @header-height);
      padding: 0;

      .scrollbar__wrap {
        padding: 16px;
      }

    }
  }

  .@{prefix-cls-detail} {
    position: absolute;
  }
</style>