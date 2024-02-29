<!--
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
-->
<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="handleClick">
    <template #icon>
      <slot name="icon"></slot>
    </template>
    <template #default>
      <p-icon v-if="preIcon" :icon="preIcon"></p-icon>
      <slot></slot>
      <p-icon v-if="sufIcon" :icon="sufIcon"></p-icon>
    </template>
  </Button>
</template>
  
<script lang='ts' setup>
  import { Button } from 'ant-design-vue'
  import { computed, unref, useAttrs } from 'vue'
  import buttonProps from './props'
  // import { useAttrs } from '@phil/hooks'
  // useAttrs()
  const attrs = useAttrs()
  console.log('attrs', attrs);
  const emit = defineEmits(['onClick'])
  
  
  defineOptions({
    name: 'PButton',
    inheritAttrs: false,
    extends: Button
  })

  const props = defineProps(buttonProps)

  const getButtonClass = computed(() => {
    const { color, disabled } = props
    return [
      {
        [`ant-btn-${color}`]: !!color,
        // 'is-disabled': disabled
      }
    ]
  })

  // 
  const getBindValue = computed(() => ({ ...unref(attrs), ...props }))

  const handleClick = () => {
    console.log('handleClick');
    
    emit('onClick')
  }
  
</script>
  
<style lang='less' scoped>
  
</style>