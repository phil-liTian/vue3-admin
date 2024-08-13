<!--
 * @Date: 2024-06-11 14:01:00
 * @LastEditors: phil_litian
-->
<template>
  <Col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%;" :style="{ textAlign: actionColOpt.style.textAlign }">
      <Form.Item>
        <slot name="resetBefore"></slot>
        <PButton 
          v-if='showResetButton'
          v-bind="getResetBtnOptions"
          @click="resetAction"
          class="mr-2">
          {{ getResetBtnOptions.text }}
        </PButton>
        
        <slot name="submitBefore"></slot>
        <PButton
          v-if='showSubmitButton'
          v-bind="getSubmitBtnOptions"
          type='primary'
          @click="submitAction"
          class="mr-2">
          {{ getSubmitBtnOptions.text }}
        </PButton>

        <slot name="advanceBefore"></slot>
        <PButton 
          type="link" 
          size="small"
          v-if="showAdvancedButton">
          {{ t('component.form.putAway') }}
          <PBasicArrow class="ml-1" />
        </PButton>
        <slot name="advanceAfter"></slot>
      </Form.Item>
    </div>
  </Col>  
</template>
  
<script lang='ts' setup>
  import { PropType, computed } from 'vue';
  import { Col, Form } from 'ant-design-vue'
  import { useI18n } from '@h/web/useI18n'
  import { ButtonProps } from '@/components/Button';
  import { PBasicArrow } from '@c/Basic/index'
  import { propTypes } from '@/utils/propTypes';
  import { useFormContext } from '../hooks/useFormContext'
  import { ColEx } from '../types/index'
  const { t } = useI18n()
  const props = defineProps({
    showAdvancedButton: propTypes.bool.def(true),
    showActionButtonGroup: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<ButtonProps>,
      default: () => ({})
    },
    submitButtonOptions: {
      type: Object as PropType<ButtonProps>,
      default: () => ({})
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColEx>>,
      default: () => ({})
    }
  })

  const { submitAction, resetAction } = useFormContext()

  const actionColOpt = computed(() => {
    const { actionColOptions } = props
    const actionColOpt: Partial<ColEx> = {
      style: { textAlign: 'right' },
      ...actionColOptions
    }

    return actionColOpt
  })

  const getResetBtnOptions = computed(() => {
    return Object.assign({
      text: t('common.resetText')
    }, props.resetButtonOptions )
  })

  const getSubmitBtnOptions = computed(() => {
    return Object.assign({
      text: t('common.queryText')
    }, props.submitButtonOptions)
  })

</script>
  
<style lang='less' scoped>
  
</style>