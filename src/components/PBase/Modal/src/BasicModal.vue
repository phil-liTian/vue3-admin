<!--
 * @Date: 2024-04-12 16:12:14
 * @LastEditors: phil_litian
-->
<template>
  <Modal v-bind="getBindValue">
    <template #title v-if="!$slots.title">
      <ModalHeader
        :helpMessage="getProps.helpMessage"
        :title="getMergeProps.title" />
    </template>

    <!-- icon -->
    <template #closeIcon v-if="!$slots.closeIcon">
      <ModalClose
        :canFullScreen="canFullScreen"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen" />
    </template>
    
    <ModalWrapper
      ref="modalWrapperRef"
      :fullScreen="fullScreenRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip">
      <slot></slot>
    </ModalWrapper>

    <!-- footer -->
    <template #footer v-if="!$slots.footer">
      <ModalFooter
        v-bind="getMergeProps"
        @cancel="handleCancel"
        @ok="handleOk">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </ModalFooter>
    </template>

    <!-- 除了上述组件内部定义好的title、closeIcon、footer也可由开发人员自定义相关组件 -->
    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>
  
<script lang='ts' setup>
  import { computed, ref, getCurrentInstance, unref, useAttrs, watch, watchEffect, nextTick } from 'vue'
  import Modal from './components/Modal'
  import ModalClose from './components/ModalClose.vue'
  import ModalHeader from './components/ModalHeader.vue'
  import ModalFooter from './components/ModalFooter.vue'
  import ModalWrapper from './components/ModalWrapper.vue'
  import { ModalMethods, ModalProps } from './typing'
  import { useFullScreen } from './hooks/useModalFullScreen'
  import { basicProps } from './props'
  import { omit } from 'lodash-es'
  import { deepMerge } from '@/utils'

  defineOptions({ name: 'PBasicModal' })
  const attrs = useAttrs()
  const emits = defineEmits(['register', 'close', 'ok', 'open-change', 'update:open'])
  const props = defineProps(basicProps)
  
  const propsRef = ref<Nullable<Partial<ModalProps>>>(null)
  const openRef = ref(false)
  const modalWrapperRef = ref(null)

  const { fullScreenRef, handleFullScreen, getWrapClassName } = useFullScreen()

  const modalMethods: ModalMethods = {
    setModalProps
  }

  const instance = getCurrentInstance()
  if ( instance ) {
    emits('register', modalMethods, instance.uid)
  }

  // 此处可实现当前组件内部使用属性优先级为 propsRef -> props
  const getMergeProps = computed(() => {
    return {
      ...props,
      ...unref(propsRef)
    }
  })

  const getProps = computed(() => {
    const opt = {
      ...unref(getMergeProps),
      title: undefined
    }

    return opt
  })

  // Modal真正绑定的属性
  const getBindValue = computed(() => {
    const attr: Partial<ModalProps> = {
      ...attrs,
      ...unref(getMergeProps),
      open: unref(openRef)
    }

    attr.wrapClassName = `${unref(getWrapClassName)}`
    
    return omit(attr, 'title') // 不用modal组件原本的title
  })

  function setModalProps(props: Partial<ModalProps>) {
    propsRef.value = deepMerge(propsRef.value || {}, props)
    
    if ( Reflect.has(props, 'open') ) {
      openRef.value = !!props.open
    }
  }

  function handleCancel() {
    openRef.value = false
    emits('close')
  }

  function handleOk() {
    emits('ok')
  }

  watchEffect(() => {
    // 显示modal有两个方式：1.动态传入open属性 2.register 和 openModal配合使用
    openRef.value = !!props.open
  })

  watch(() => openRef.value, v => {
    emits('open-change', v)
    emits('update:open', v)
    nextTick(() => {
      if ( unref(modalWrapperRef) ) {
        unref(modalWrapperRef)?.scrollTop()
      }
    })
  })
</script>
  
<style lang='less'>
  @import './index.less';
</style>