<!--
 * @Date: 2024-03-28 10:34:55
 * @LastEditors: phil_litian
-->
<template>
  <div :class="prefixCls" :style="getStyle" v-if="showFooter">
    <template v-if="!$slots.footer">
      <slot name="insertFooter"></slot>
      <p-button 
        class="mr-2" 
        v-if="showCancelBtn" 
        @click="handleClose"
        v-bind="cancelButtonProps">
        {{ cancelText }}
      </p-button>
      <slot name="centerFooter"></slot>
      
      <p-button 
        class="mr-2" 
        :type="okType"
        v-if="showOkBtn" 
        @click="handleOk"
        v-bind="okButtonProps">
        {{ okText }}
      </p-button>
      <slot name="appendFooter"></slot>
    </template>

    <template v-else>
      <slot name="footer"></slot>
    </template>

  </div>
</template>
  
<script lang='ts' setup>
  import { useDesign } from '@h/web/useDesign'
  import { computed, CSSProperties } from 'vue'
  import { footerProps } from '../props'
  const { prefixCls } = useDesign('basic-drawer-footer')
  defineOptions({ name: 'BasicDrawerFooter'})
  const emits = defineEmits(['ok', 'close'])
  const props = defineProps({
    ...footerProps
  })

  const getStyle = computed((): CSSProperties => {
    return {
      height: props.footerHeight,
      lineHeight: `calc(${props.footerHeight} - 1px)`
    }
  })
  
  // 关闭
  const handleClose = () => {
    emits('close')
  }

  // 确认
  const handleOk = () => {
    emits('ok')
  }

</script>
  
<style lang='less'>
  @prefix-cls: ~'@{namespace}-basic-drawer-footer';

  .@{prefix-cls} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>