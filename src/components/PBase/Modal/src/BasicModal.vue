<!--
 * @Date: 2024-04-12 16:12:14
 * @LastEditors: phil_litian
-->
<template>
  <Modal v-bind="getBindValue">
    <slot></slot>
  </Modal>
</template>
  
<script lang='ts' setup>
  import { computed, ref, getCurrentInstance, unref, useAttrs } from 'vue'
  import Modal from './components/Modal'
  import { ModalMethods, ModalProps } from './typing'
  defineOptions({ name: 'PBasicModal' })
  const attrs = useAttrs()
  const emits = defineEmits(['register'])
  const props = defineProps({

  })
  const propsRef = ref<Nullable<Partial<ModalProps>>>(null)
  const openRef = ref(false)

  const modalMethods: ModalMethods = {
    setModalProps
  }

  const instance = getCurrentInstance()
  if ( instance ) {
    emits('register', modalMethods)
  }

  const getBindValue = computed(() => {
    const attr = {
      ...attrs,
      open: unref(openRef)
    }

    return attr
  })

  function setModalProps(props: Partial<ModalProps>) {
    
    if ( Reflect.has(props, 'open') ) {
      openRef.value = !!props.open
    }
  }
</script>
  
<style lang='less' scoped>
  
</style>