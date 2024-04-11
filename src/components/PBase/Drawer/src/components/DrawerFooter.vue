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
        {{ cancelText || t('common.cancelText') }}
      </p-button>
      <slot name="centerFooter"></slot>
      
      <p-button 
        class="mr-2" 
        :type="okType"
        v-if="showOkBtn" 
        @click="handleOk"
        v-bind="okButtonProps">
        {{ okText || t('common.okText') }}
      </p-button>
      <slot name="appendFooter"></slot>
    </template>

    <template v-else>
      <slot name="footer"></slot>
    </template>

  </div>
</template>
  
<script lang='ts' setup>
  import { computed, CSSProperties } from 'vue'
  import { useI18n } from '@h/web/useI18n'
  import { useDesign } from '@h/web/useDesign'
  import { footerProps } from '../props'
  const { prefixCls } = useDesign('basic-drawer-footer')
  defineOptions({ name: 'BasicDrawerFooter'})
  const { t } = useI18n()

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
  @footer-height: 60px;

  .@{prefix-cls} {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: right;
    border-top: 1px solid @border-color-base;
    background-color: @component-background;

    > * {
      margin-right: 8px;
    }
  }
</style>