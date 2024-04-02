<!--
 * @Date: 2024-04-01 21:49:42
 * @LastEditors: phil_litian
-->
<template>
  <Switch 
    :disabled="disabled" 
    @change="handleChange"
    :checkedChildren="t(checkedChildren)"
    :un-checked-children="t(unCheckedChildren)" />
</template>
  
<script lang='ts' setup>
  import { Switch } from 'ant-design-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { propTypes } from '@u/propTypes'
  defineOptions({ name: 'PSwitch' })
  const emits = defineEmits(['change'])
  const { prefixCls } = useDesign('basic-switch')
  const { t } = useI18n('layout')

  defineProps({
    disabled: propTypes.bool.def(false),
    checkedChildren: {
      type: String,
      default: 'setting.on'
    },
    unCheckedChildren: {
      type: String,
      default: 'setting.off'
    }
  })

  const handleChange = () => {
    emits('change')
  }
  
</script>
  
<style lang='less' scoped>
  
</style>